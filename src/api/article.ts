import request from "@/utils/request";

export function fetchList(query: any = null) {
  return request({
    url: "/vue3-element-admin/article/list",
    method: "get",
    params: query,
  });
}

export function fetchArticle(id: number | string) {
  return request({
    url: "/vue3-element-admin/article/detail",
    method: "get",
    params: { id },
  });
}

export function fetchPv(pv: any) {
  return request({
    url: "/vue3-element-admin/article/pv",
    method: "get",
    params: { pv },
  });
}

export function createArticle(data: any) {
  return request({
    url: "/vue3-element-admin/article/create",
    method: "post",
    data,
  });
}

export function updateArticle(data: any) {
  return request({
    url: "/vue3-element-admin/article/update",
    method: "post",
    data,
  });
}
