import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router/index";
import { mockXHR } from "../mock";
import "./styles/index.scss";
import "@iconify/iconify";
import "./permission";

const app = createApp(App);
// if you don't  use mock,this way is use fastmock interface. 
// if (import.meta.env.MODE == "development") {
//   //   const { mockXHR } = require("../mock");
//   mockXHR();
// }

app.use(createPinia()).use(router).mount("#app");
