import { RouterItem } from "@/router";
import Mock from "mockjs";
import { deepClone } from "../../src/utils";
import { asyncRoutes, constantRoutes } from "./routes";

const routes: Array<RouterItem> = deepClone([...constantRoutes, ...asyncRoutes]);

export type RoleType = {
  key: string;
  name: string;
  description: string;
  routes: Array<RouterItem>;
};

const roles: Array<RoleType> = [
  {
    key: "admin",
    name: "admin",
    description: "Super Administrator. Have access to view all pages.",
    routes: routes,
  },
  {
    key: "editor",
    name: "editor",
    description: "Normal Editor. Can see all pages except permission page",
    routes: routes.filter((i: any) => i.path !== "/permission"), // just a mock
  },
  {
    key: "visitor",
    name: "visitor",
    description: "Just a visitor. Can only see the home page and the document page",
    routes: [
      {
        path: "",
        redirect: "dashboard",
        children: [
          {
            path: "dashboard",
            name: "Dashboard",
            meta: { title: "dashboard", icon: "mdi:dashboard" },
          },
        ],
      },
    ],
  },
];

export default [
  // mock get all routes form server
  {
    url: "/vue3-element-admin/routes",
    type: "get",
    response: (_: any) => {
      return {
        code: 20000,
        data: routes,
      };
    },
  },

  // mock get all roles form server
  {
    url: "/vue3-element-admin/roles",
    type: "get",
    response: (_: any) => {
      return {
        code: 20000,
        data: roles,
      };
    },
  },

  // add role
  {
    url: "/vue3-element-admin/role",
    type: "post",
    response: {
      code: 20000,
      data: {
        key: Mock.mock("@integer(300, 5000)"),
      },
    },
  },

  // update role
  {
    url: "/vue3-element-admin/role/[A-Za-z0-9]",
    type: "put",
    response: {
      code: 20000,
      data: {
        status: "success",
      },
    },
  },

  // delete role
  {
    url: "/vue3-element-admin/role/[A-Za-z0-9]",
    type: "delete",
    response: {
      code: 20000,
      data: {
        status: "success",
      },
    },
  },
];
