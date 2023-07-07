import { defineStore } from "pinia";
import { login, logout, getInfo } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import router, { resetRouter } from "@/router";
import { usePermissionStore } from "./permission";
import type { RouterItem } from "@/router";
import { useTagsViewStore } from "./tagsView";
import { RouteRecordRaw } from "vue-router";

type User = {
  username: string;
  password: string;
};

export const useUserStore = defineStore("userStore", {
  state: () => ({ token: getToken(), name: "", avatar: "", introduction: "", roles: <Array<string>>[] }),
  actions: {
    // user login
    login(userInfo: User): Promise<void> {
      const { username, password } = userInfo;
      return new Promise((resolve, reject) => {
        login({ username: username.trim(), password: password })
          .then((response: any) => {
            const { data } = response;
            // commit("SET_TOKEN", data.token);
            this.token = data.token;
            setToken(data.token);
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    getInfo(): Promise<any> {
      return new Promise((resolve, reject) => {
        getInfo(this.token)
          .then((response: any) => {
            const { data } = response;

            if (!data) {
              reject("Verification failed, please Login again.");
            }

            const { roles, name, avatar, introduction } = data;

            // roles must be a non-empty array
            if (!roles || roles.length <= 0) {
              reject("getInfo: roles must be a non-null array!");
            }
            this.roles = roles;
            this.name = name;
            this.avatar = avatar;
            this.introduction = introduction;
            //  commit("SET_ROLES", roles);
            //  commit("SET_NAME", name);
            //  commit("SET_AVATAR", avatar);
            //  commit("SET_INTRODUCTION", introduction);
            resolve(data);
          })
          .catch((error: any) => {
            reject(error);
          });
      });
    },
    // dynamically modify permissions
    changeRoles(role: string): Promise<void> {
      return new Promise<void>(async (resolve, reject) => {
        const token = role + "-token";

        // commit("SET_TOKEN", token);
        this.token = token;
        setToken(token);

        const { roles } = await this.getInfo();
        // console.log("SET_ROLES", roles);
        resetRouter();

        // generate accessible routes map based on roles
        const permissions = usePermissionStore();
        const accessRoutes: Array<RouterItem> = await permissions.generateRoutes(roles);

        // dynamically add accessible routes
        for (let index = 0; index < accessRoutes.length; index++) {
          const element = accessRoutes[index];
          router.addRoute(element as RouteRecordRaw);
        }

        // reset visited views and cached views
        // dispatch("tagsView/delAllViews", null, { root: true });
        useTagsViewStore().delAllViews();
        resolve();
      }).catch((e) => {
        console.log("userStore:", e);
      });
    },
    // user logout
    logout(): Promise<void> {
      return new Promise((resolve, reject) => {
        logout()
          .then(() => {
            this.token = "";
            this.roles = [];
            removeToken();
            resetRouter();

            useTagsViewStore().delAllViews();
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    // // remove token
    resetToken(): Promise<any> {
      return new Promise((resolve) => {
        //     commit("SET_TOKEN", "");
        //     commit("SET_ROLES", []);
        this.token = "";
        this.roles = [];
        removeToken();
        resolve(null);
      });
    },
  },
  getters: {},
});
