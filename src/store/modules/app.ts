import Cookies from "js-cookie";
import { defineStore } from "pinia";

export const useAppBarStore = defineStore("navbar", {
  state: () => ({
    sidebar: {
      opened: Cookies.get("sidebarStatus") ? !!parseInt(Cookies.get("sidebarStatus") as string) : true,
      withoutAnimation: false,
    },
    device: "desktop",
    size: Cookies.get("size") || "default",
  }),
  actions: {
    toggleSideBar() {
      this.sidebar.opened = !this.sidebar.opened;
      this.sidebar.withoutAnimation = false;
      if (this.sidebar.opened) {
        Cookies.set("sidebarStatus", "1");
      } else {
        Cookies.set("sidebarStatus", "0");
      }
    },
    closeSideBar({ withoutAnimation }: { withoutAnimation: boolean }) {
      Cookies.set("sidebarStatus", "0");
      this.sidebar.opened = false;
      this.sidebar.withoutAnimation = withoutAnimation;
    },
    toggleDevice(device: string) {
      this.device = device;
    },
    setSize(size: string) {
      this.size = size;
      Cookies.set("size", size);
    },
  },
});
