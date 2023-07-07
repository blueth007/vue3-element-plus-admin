import { defineStore } from "pinia";
import { asyncRoutes, constantRoutes } from "@/router";
import type { RouterItem } from "@/router";

export const usePermissionStore = defineStore("permission", {
  state: () => ({
    routes: [] as Array<RouterItem>,
    addRoutes: [] as Array<RouterItem>,
  }),
  // 也可以这样定义
  // state: () => ({ count: 0 })
  actions: {
    setRoutes(routes: Array<RouterItem> = []) {
      this.addRoutes = routes;
      this.routes = constantRoutes.concat(routes);
    },
    generateRoutes(roles: Array<any>): Promise<Array<RouterItem>> {
      return new Promise((resolve) => {
        let accessedRoutes;
        if (roles.includes("admin")) {
          accessedRoutes = asyncRoutes || [];
        } else {
          accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
        }
        this.setRoutes(accessedRoutes);
        resolve(accessedRoutes);
      });
    },
  },
});

// import { createPinia, defineStore } from "pinia";

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles: Array<string>, route: any) {
  if (route.meta && route.meta.roles) {
    return roles.some((role: string) => route.meta.roles.includes(role));
  } else {
    return true;
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
function filterAsyncRoutes(routes: Array<RouterItem>, roles: Array<string>) {
  const res: Array<RouterItem> = [];
  routes &&
    routes.forEach((route: RouterItem) => {
      const tmp = { ...route };
      if (hasPermission(roles, tmp)) {
        if (tmp.children) {
          tmp.children = filterAsyncRoutes(tmp.children, roles);
        }
        res.push(tmp);
      }
    });

  return res;
}
