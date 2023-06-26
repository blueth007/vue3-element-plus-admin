import { defineStore } from "pinia";
export const useLogStore = defineStore("logStore", {
  state: () => ({
    logs: [] as Array<any>,
  }),
  actions: {
    addErrorLog(log: any) {
      this.logs.push(log);
    },
    clearErrorLog() {
      this.logs.splice(0);
    },
  },
});
