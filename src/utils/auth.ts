import Cookies from "js-cookie";

const TokenKey = "Vue3-Token";

export function getToken() {
  // return "cookied";
  return Cookies.get(TokenKey);
}

export function setToken(token: string) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}
