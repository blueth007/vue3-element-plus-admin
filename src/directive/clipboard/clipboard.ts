// Inspired by https://github.com/Inndy/vue-clipboard2
import type { Directive, DirectiveBinding } from "vue";
// const Clipboard = require("clipboard");
import Clipboard from "clipboard";

if (!Clipboard) {
  throw new Error("you should npm install `clipboard` --save at first ");
}

export default {
  mounted(el: any, binding: DirectiveBinding) {
    if (binding.arg === "success") {
      el._v_clipboard_success = binding.value;
    } else if (binding.arg === "error") {
      el._v_clipboard_error = binding.value;
    } else {
      const clipboard = new Clipboard(el, {
        text() {
          return binding.value;
        },
        action() {
          return binding.arg === "cut" ? "cut" : "copy";
        },
      });
      clipboard.on("success", (e: any) => {
        const callback = el._v_clipboard_success;
        callback && callback(e); // eslint-disable-line
      });
      clipboard.on("error", (e: any) => {
        const callback = el._v_clipboard_error;
        callback && callback(e); // eslint-disable-line
      });
      el._v_clipboard = clipboard;
    }
  },
  updated(el: any, binding: DirectiveBinding) {
    if (binding.arg === "success") {
      el._v_clipboard_success = binding.value;
    } else if (binding.arg === "error") {
      el._v_clipboard_error = binding.value;
    } else {
      el._v_clipboard.text = function () {
        return binding.value;
      };
      el._v_clipboard.action = function () {
        return binding.arg === "cut" ? "cut" : "copy";
      };
    }
  },
  unmounted(el: any, binding: DirectiveBinding) {
    if (binding.arg === "success") {
      delete el._v_clipboard_success;
    } else if (binding.arg === "error") {
      delete el._v_clipboard_error;
    } else {
      el._v_clipboard.destroy();
      delete el._v_clipboard;
    }
  },
} as Directive;
