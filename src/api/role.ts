import request from "@/utils/request";

export function getRoutes() {
  return request({
    url: "/vue3-element-admin/routes",
    method: "get",
  });
}

export function getRoles() {
  return request({
    url: "/vue3-element-admin/roles",
    method: "get",
  });
}

export function addRole(data:any) {
  return request({
    url: "/vue3-element-admin/role",
    method: "post",
    data,
  });
}

export function updateRole(id:any, data:any) {
  return request({
    url: `/vue3-element-admin/role/${id}`,
    method: "put",
    data,
  });
}

export function deleteRole(id:any) {
  return request({
    url: `/vue3-element-admin/role/${id}`,
    method: "delete",
  });
}
