import request from "@/utils/request";

export function searchUser(name: any): Promise<any> {
  return request({
    url: "/vue3-element-admin/search/user",
    method: "get",
    params: { name },
  });
}

export function transactionList(query: any = null): Promise<any> {
  return request({
    url: "/vue3-element-admin/transaction/list",
    method: "get",
    params: query,
  });
}
