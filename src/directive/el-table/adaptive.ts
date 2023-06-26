// import { addResizeListener, removeResizeListener } from "element-ui/src/utils/resize-event"; // element-plus 没有找到这个函数

import { debounce } from "@/utils";

/**
 * How to use
 * <el-table height="100px" v-el-height-adaptive-table="{bottomOffset: 30}">...</el-table>
 * el-table height is must be set
 * bottomOffset: 30(default)   // The height of the table from the bottom of the page.
 */

const doResize = (el: any, binding: any, vnode: any) => {
  const { componentInstance: $table } = vnode;

  const { value } = binding;

  if (!$table.height) {
    throw new Error(`el-$table must set the height. Such as height='100px'`);
  }
  const bottomOffset = (value && value.bottomOffset) || 30;

  if (!$table) return;

  const height = window.innerHeight - el.getBoundingClientRect().top - bottomOffset;
  $table.layout.setHeight(height);
  $table.doLayout();
};

export default {
  created(el: any, binding: any, vnode: any) {
    el.resizeListener = () => {
      doResize(el, binding, vnode);
    };
    // parameter 1 is must be "Element" type
    addResizeListener(window.document.body, el.resizeListener);
  },
  mounted(el: any, binding: any, vnode: any) {
    doResize(el, binding, vnode);
  },
  unmounted(el: any) {
    removeResizeListener(window.document.body, el.resizeListener);
  },
};

const isServer = typeof window === "undefined";
const resizeHandler = function (entries: any) {
  for (let entry of entries) {
    const listeners = entry.target.__resizeListeners__ || [];
    if (listeners.length) {
      listeners.forEach((fn: Function) => {
        fn();
      });
    }
  }
};
/* istanbul ignore next */
export const addResizeListener = function (element: any, fn: Function) {
  if (isServer) return;
  if (!element.__resizeListeners__) {
    element.__resizeListeners__ = [];
    element.__ro__ = new ResizeObserver(debounce(resizeHandler, 16));
    element.__ro__.observe(element);
  }
  element.__resizeListeners__.push(fn);
};

/* istanbul ignore next */
export const removeResizeListener = function (element: any, fn: Function) {
  if (!element || !element.__resizeListeners__) return;
  element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1);
  if (!element.__resizeListeners__.length) {
    element.__ro__.disconnect();
  }
};
