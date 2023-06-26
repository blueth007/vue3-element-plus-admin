import { defineStore, Store } from "pinia";
import { computed, ref } from "vue";
import getter from "./getters"; // 动态自动导入modules下所有文件

type StoreModules = Record<string, any>; // 如果使用 Store不能正常引入proxy的属性

export const useStore = defineStore("store", () => {
  const { permission, user, tagsView, app, errorLog, settings } = Object.entries(getter).reduce<StoreModules>(
    (stores: StoreModules, [path, module]) => {
      if (!stores[path]) {
        stores[path] = module(); // 执行 useXxStore 方法
      }
      return stores;
    },
    {}
  );

  // console.log("stores", user);
  //getter：
  const roles = computed(() => user.roles);
  const permission_routes = computed(() => permission.routes);
  const visitedViews = computed(() => tagsView.visitedViews);
  const cachedViews = computed(() => tagsView.cachedViews);
  const token = computed(() => user.token);
  const avatar = computed(() => user.avatar);
  const name = computed(() => user.name);
  const introduction = computed(() => user.introduction);
  const sidebar = computed(() => app.sidebar);
  const size = computed(() => app.size);
  const device = computed(() => app.device);
  const errorLogs = computed(() => errorLog.logs);

  //方法：

  return {
    permission,
    user,
    tagsView,
    app,
    errorLog,
    settings,
    sidebar,
    size,
    device,
    roles,
    token,
    avatar,
    name,
    introduction,
    permission_routes,
    visitedViews,
    cachedViews,
    errorLogs,
  };
});
