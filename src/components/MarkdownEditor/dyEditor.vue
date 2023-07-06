<template>
  <div>
    <div :id="id"></div>
    <el-button @click="getHTML">getHTML</el-button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, onUnmounted } from "vue";
import dynamicLoadScript, { dynamicLoadLink } from "@/utils/loadDymoicScipt";
import defaultOptions from "./default-options";
import { ElMessage, ElButton } from "element-plus";
import type { PropType } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  id: {
    type: String,
    required: false,
    default: () => {
      return (
        "markdown-editor-" +
        +new Date() +
        ((Math.random() * 1000).toFixed(0) + "")
      );
    },
  },
  options: {
    type: Object as PropType<{ [key: string]: any }>,
    default: () => {
      return defaultOptions;
    },
  },
  mode: {
    type: String,
    default: "markdown",
  },
  height: {
    type: String,
    required: false,
    default: "300px",
  },
  language: {
    type: String,
    required: false,
    default: "en-US", //'zh-CN'
  },
});

const emit = defineEmits(["update:modelValue"]);

const editor = ref<any>();
onMounted(() => {
  onInit();
});
onUnmounted(() => {
  destroyEditor();
});

const onInit = async () => {
  dynamicLoadLink(
    "https://uicdn.toast.com/editor/latest/toastui-editor.min.css"
  );

  dynamicLoadScript(
    (<any>window).window.toastui,
    "https://uicdn.toast.com/editor/latest/toastui-editor-all.min.js",
    (err: any) => {
      if (err) {
        ElMessage.error(err.message);
        return;
      }
      props.language === "zh-CN"
        ? loadRemoteScript(
            "https://uicdn.toast.com/editor/latest/i18n/zh-cn.js",
            () => {
              // 这里是加载完成后的回调函数
              initEditor();
            }
          )
        : initEditor();
    }
  );
};
const initEditor = () => {
  editor.value = new (<any>window).window.toastui.Editor({
    ...props.options,
    el: document.getElementById(props.id),
    height: props.height,
    initialEditType: props.mode,
    initialValue: props.modelValue,
    language: props.language,
  });
  editor.value.on("change", () => {
    emit("update:modelValue", editor.value!.getMarkdown());
  });
};
function destroyEditor() {
  if (!editor) return;
  editor.value.off("change");
  editor.value!.destroy();
}
function getMarkdown() {
  return editor.value.getMarkdown();
}
function getHTML() {
  // console.log(data.editor!.getHTML())
  return (
    document.getElementById(props.id)?.querySelector(".toastui-editor-contents")
      ?.innerHTML || "111"
  );
  // return data.editor!.getHTML(); //Error: Uncaught RangeError: Applying a mismatched transaction
}
function loadRemoteScript(url: string, callback: Function) {
  const isExit = document.getElementById(url);
  if (isExit) {
    callback();
    return;
  }
  const script = document.createElement("script");
  script.src = url;
  script.id = url;
  script.async = true;

  script.onload = () => {
    callback();
  };

  document.body.appendChild(script);
}
</script>
