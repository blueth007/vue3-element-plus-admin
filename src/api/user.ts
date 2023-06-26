import request from "@/utils/request";

export function login(data: any) {
  return request({
    url: "/vue3-element-admin/user/login",
    method: "post",
    data,
  });
}

export function getInfo(token: string | undefined): Promise<any> {
  return request({
    url: "/vue3-element-admin/user/info",
    method: "get",
    params: { token },
  });
}

export function logout() {
  return request({
    url: "/vue3-element-admin/user/logout",
    method: "post",
  });
}
