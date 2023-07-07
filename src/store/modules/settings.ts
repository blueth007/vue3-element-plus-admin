import defaultSettings from "@/settings";
import { defineStore } from "pinia";
import { reactive, toRefs } from "vue";
const { showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings;

export default defineStore("settings", () => {
  const data = reactive<{ theme: string; showSettings: boolean; tagsView: boolean; fixedHeader: boolean; sidebarLogo: boolean }>({
    theme: "#409eff",
    showSettings,
    tagsView,
    fixedHeader,
    sidebarLogo,
  });

  //   state: () => ({
  //     theme: "default",
  //     showSettings,
  //     tagsView,
  //     fixedHeader,
  //     sidebarLogo,
  //   }),

  //   getters: {},
  //   actions: {
  function changeSetting({ key, value }: { key: string; value: any }) {
    if (data.hasOwnProperty(key)) {
      (data as any)[key] = value;
    }
  }

  return { ...toRefs(data), changeSetting };
});
