import { defineStore } from "pinia";

import type { RouteItem } from "@/router";

export const useTagsViewStore = defineStore("tagsView", {
  state: () => {
    return {
      visitedViews: <Array<RouteItem>>[],
      cachedViews: <Array<string>>[],
    };
  },
  actions: {
    addView(view: RouteItem) {
      this.addVisitedView(view);
      this.addCachedView(view);
    },
    addVisitedView(view: RouteItem) {
      if (this.visitedViews.some((v: RouteItem) => v.path === view.path)) return;

      this.visitedViews.push(
        Object.assign({}, view, {
          title: view.meta?.title || "no-name",
        })
      );
    },
    addCachedView(view: RouteItem) {
      if (this.cachedViews.includes(view.name as string)) return;
      if (!view.meta?.noCache) {
        this.cachedViews.push(view.name as string);
      }
    },
    delView(view: RouteItem): Promise<any> {
      return new Promise((resolve) => {
        this.delVisitedView(view);
        this.delCachedView(view);
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews],
        });
      });
    },
    delVisitedView(view: RouteItem) {
      return new Promise((resolve) => {
        // for (const [i, v] of this.visitedViews.entries()) {
        //   if (v.path === view.path) {
        //     this.visitedViews.splice(i, 1);

        //     console.log("deleted:", view, i, this.visitedViews);
        //     break;
        //   }
        // }
        this.visitedViews = this.visitedViews.filter((v) => v.path !== view.path);
        console.log("deleted:", view, this.visitedViews);
        resolve([...this.visitedViews]);
      });
    },
    delCachedView(view: RouteItem) {
      return new Promise((resolve) => {
        const index = this.cachedViews.indexOf(view.name as string);
        index > -1 && this.cachedViews.splice(index, 1);
        resolve([...this.cachedViews]);
      });
    },
    delOthersViews(view: RouteItem) {
      return new Promise((resolve) => {
        this.delOthersVisitedViews(view);
        this.delOthersCachedViews(view);
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews],
        });
      });
    },
    delOthersVisitedViews(view: RouteItem) {
      return new Promise((resolve) => {
        this.visitedViews = this.visitedViews.filter((v) => {
          return v.meta?.affix || v.path === view.path;
        });
        resolve([...this.visitedViews]);
      });
    },
    delOthersCachedViews(view: RouteItem) {
      return new Promise((resolve) => {
        const index = this.cachedViews.indexOf(view.name as string);
        if (index > -1) {
          this.cachedViews = this.cachedViews.slice(index, index + 1);
        } else {
          // if index = -1, there is no cached tags
          this.cachedViews = [];
        }
        resolve([...this.cachedViews]);
      });
    },
    delAllViews(/*view: RouteItem*/): Promise<any> {
      return new Promise((resolve) => {
        this.delAllVisitedViews();
        this.delAllCachedViews();
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews],
        });
      });
    },
    delAllVisitedViews() {
      return new Promise((resolve) => {
        // keep affix tags
        const affixTags = this.visitedViews.filter((tag: RouteItem) => tag.meta?.affix);
        this.visitedViews = affixTags;
        resolve([...this.visitedViews]);
      });
    },
    delAllCachedViews() {
      return new Promise((resolve) => {
        this.cachedViews = [];
        resolve([...this.cachedViews]);
      });
    },
    updateVisitedView(view: RouteItem) {
      for (let v of this.visitedViews) {
        if (v.path === view.path) {
          v = Object.assign(v, view);
          break;
        }
      }
    },
  },
});
