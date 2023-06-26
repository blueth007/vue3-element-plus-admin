<template>
  <div>
    <div :id="id">
    </div>
    <el-button @click="getHTML">getHTML</el-button>
  </div>
</template>

<script setup lang="ts">

import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/i18n/zh-cn";
import Editor, { EditorCore, EditorOptions, EditorType } from "@toast-ui/editor";
import defaultOptions from "./default-options";

import { computed, nextTick, onMounted, onUnmounted, PropType, reactive, watch } from "vue";


const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  id: {
    type: String,
    required: false,
    default: () => {
      return "markdown-editor-" + +new Date() + ((Math.random() * 1000).toFixed(0) + "");
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
    default: "en-US",//'zh-CN'
  },
});

const emit = defineEmits(["update:modelValue"]);

const data: { editor: EditorCore | null } = reactive({
  editor: null,
});

const editorOptions = computed(() => {
  const options = Object.assign({}, props.options);
  // options.el = document.getElementById(props.id) as HTMLElement;
  options.initialEditType = props.mode as EditorType;
  options.height = props.height;
  options.language = props.language;
  return options;
});

watch(
  () => props.modelValue,
  (newValue, preValue) => {
    if (newValue !== preValue && newValue !== data.editor!.getMarkdown()) {
      data.editor!.setMarkdown(newValue);
    }
  }
);

watch(
  () => props.language,
  (val) => {
    destroyEditor();
    initEditor();
  }
);

watch(
  () => props.height,
  (newValue) => {
    data.editor!.setHeight(newValue);
  }, {

}
);

watch(
  () => props.mode,
  (newValue: any) => {
    data.editor!.changeMode(newValue);
  }
);


onMounted(() => {
  initEditor();
});

onUnmounted(() => {
  destroyEditor();
});

function initEditor() {
  const $el = document.getElementById(props.id) as HTMLElement;
  data.editor = new Editor({
    el: $el,
    ...editorOptions.value,
    initialValue: props.modelValue
  })
  data.editor.on("change", () => {
    emit("update:modelValue", data.editor!.getMarkdown());
  });
}

function destroyEditor() {
  if (!data.editor) return;
  data.editor.off("change");
  data.editor!.destroy();
}

function setMarkdown(value: any) {
  data.editor!.setMarkdown(value);
}

function getMarkdown() {
  return data.editor!.getMarkdown();
}

function setHtml(value: any) {
  data.editor!.setHTML(value);
}

function getHTML() {
  // console.log(data.editor!.getHTML())
  return document.getElementById(props.id)?.querySelector(".toastui-editor-contents")?.innerHTML || "111"
  // return data.editor!.getHTML(); //Error: Uncaught RangeError: Applying a mismatched transaction
}
defineExpose({
  getMarkdown, getHTML
})
</script>

<style scoped></style>
