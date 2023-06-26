import router from "./router";
import { getToken } from "./utils/auth";
// store
import { useStore } from "@/store";
import { usePermissionStore } from "@/store/permission";
import { useUserStore } from "./store/user";
import getPageTitle from "@/utils/get-page-title";

import NProgress from "nprogress"; // progress bar
import { RouteRecordRaw } from "vue-router";

const whiteList = ["/login", "/auth-redirect"]; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start();
  const store = useStore();
  const permission = usePermissionStore();
  const user = useUserStore();

  // set page title
  // document.title = getPageTitle(to.meta.title as string);
  // document.title = to.meta.title;
  // determine whether the user has logged in
  const hasToken = getToken();

  if (hasToken) {
    if (to.path === "/login") {
      // if is logged in, redirect to the home page
      next({ path: "/" });
      //  next();
      NProgress.done(); // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      const hasRoles = store.roles && store.roles.length > 0;
      if (hasRoles) {
        next();
      } else {
        try {
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          const { roles } = await user.getInfo(); //[Vue2]: await store.dispatch('user/getInfo')
          // generate accessible routes map based on roles
          const accessRoutes = await permission.generateRoutes(roles); // Vue2: store.dispatch('permission/generateRoutes', roles)

          // dynamically add accessible routes
          //[Vue2]: router.addRoutes(accessRoutes);
          accessRoutes.forEach((route) => {
            router.addRoute(route as RouteRecordRaw);
          });
          // console.log("Router is ready:", router.getRoutes());
          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          // next({ ...to, replace: true }); //会导致加载未预导入路由重新刷新
          router.push(to.path);
          next();
        } catch (error) {
          // remove token and go to login page to re-login
          //[Vue2]: await store.dispatch("user/resetToken");
          //[Vue2]: Message.error(error || "Has Error");
          user.resetToken();
          console.log("Error reset token:", error);
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next();
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach((to) => {
  // finish progress bar
  // set page title
  document.title = getPageTitle(to.meta.title as string);
  NProgress.done();
});
