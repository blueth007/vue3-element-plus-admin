import { ElMessage, ElMessageBox } from "element-plus";
import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
import { useStore } from "@/store";
import { useUserStore } from "@/store/modules/user";
import { getToken } from "@/utils/auth";

const url1 = "https://www.fastmock.site/mock/eff6a71b31840f4dad196186960edc97/data";
const request = axios.create({
  baseURL: import.meta.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
});

//请求拦截
request.interceptors.request.use(
  (config) => {
    const store = useStore();
    if (store.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers["X-Token"] = getToken();
    }
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

//响应拦截
request.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data;
    // mockjs 与 upload 自动上传失败的情况，可自动根据 res.files 进行操作
    if (res.data == "" && res.files) {
      return res;
    }
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 20000) {
      ElMessage({
        message: res.message || "Error",
        type: "error",
        duration: 5 * 1000,
      });

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        ElMessageBox.confirm("You have been logged out, you can cancel to stay on this page, or log in again", "Confirm logout", {
          confirmButtonText: "Re-Login",
          cancelButtonText: "Cancel",
          type: "warning",
        }).then(() => {
          //  store.dispatch("user/resetToken").then(() => {
          //    location.reload();
          //  });
          useUserStore()
            .resetToken()
            .then(() => {
              location.reload();
            });
        });
      }

      return Promise.reject(new Error(res.message || "Error"));
    } else {
      return res;
    }
  }, // 请求失败

  (err: any) => {
    console.log(err);
    // 这里用来处理http常见错误，进行全局提示
    let message = "";
    switch (err.response.status) {
      case 400:
        message = "请求错误(400)";
        break;
      case 401:
        message = "未授权，请重新登录(401)";
        // 这里可以做清空storage并跳转到登录页的操作
        break;
      case 403:
        message = "拒绝访问(403)";
        break;
      case 404:
        message = "请求出错(404)";
        break;
      case 408:
        message = "请求超时(408)";
        break;
      case 500:
        message = "服务器错误(500)";
        break;
      case 501:
        message = "服务未实现(501)";
        break;
      case 502:
        message = "网络错误(502)";
        break;
      case 503:
        message = "服务不可用(503)";
        break;
      case 504:
        message = "网络超时(504)";
        break;
      case 505:
        message = "HTTP版本不受支持(505)";
        break;
      default:
        message = `连接出错(${err.response.status})!`;
    }
    // 这里错误消息可以使用全局弹框展示出来
    //比如element plus 可以使用 ElMessage
    ElMessage({
      showClose: true,
      message: `${message}，请检查网络或联系管理员！`,
      type: "error",
    });
    // 这里是AxiosError类型，所以一般我们只reject我们需要的响应即可
    //console.log(message);
    return Promise.reject(message);
  }
);
export default request;
