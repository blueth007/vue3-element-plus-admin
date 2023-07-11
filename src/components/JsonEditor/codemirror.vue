<template>
    <div ref="editorRef" class="editor-main"></div>
</template>

<script lang="ts" setup>
import { basicSetup, EditorView } from "codemirror";
import { oneDark } from "@codemirror/theme-one-dark";
import { json } from "@codemirror/lang-json";
import { onMounted, ref } from "vue";


const editorRef = ref();
const editor_View = ref();
const props = defineProps({
    modelValue: {
        type: String,
        default: ""
    },
    height: {
        type: String,
        default: '300px'
    }
})
const initEditor = () => {
    if (typeof editor_View.value !== "undefined") {
        editor_View.value.destroy();
    }

    const jsonString = `{
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier",
    "vue-global-api"
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    endOfLine: "auto",
    "prettier/prettier": ["error", { "endOfLine": "auto" }]
  },
}`;
    // 自定义主题
    const myTheme = EditorView.theme({

        "&": {
            color: "white",
            backgroundColor: " #112435"
        },
        ".cm-content": {
            caretColor: "#0e9",
            // color: "#F08047"
        },
        "&.cm-focused .cm-cursor": {
            borderLeftColor: "#0e9"

        },
        "&.cm-focused .cm-selectionBackground, ::selection": {
            backgroundColor: "#074"
        },
        ".cm-gutters": {
            backgroundColor: "#1F4661",
            color: "#ddd",
            border: "none"
        },

        ".cm-o-replacement": {
            display: "inline-block",
            width: ".5em",
            height: ".5em",
            borderRadius: ".25em"
        },

    }, { dark: true })
    // const startState = EditorState.create({
    //     doc: jsonString,
    //     extensions: [basicSetup, oneDarkTheme, javascript(), json()],
    // });
    if (editorRef.value) {
        editor_View.value = new EditorView({
            // state: startState,
            doc: props.modelValue || jsonString,
            extensions: [basicSetup, oneDark, json(),
                EditorView.updateListener.of(function (e) {
                    //监听事件变化
                    console.log("update：", e.state.doc.toString());
                })],
            parent: editorRef.value,
        });
    }
};
// onMounted生命周期可以保证读取到dom元素
onMounted(() => {
    initEditor();
});
</script>

<style lang="scss" scoped>
.editor-main {
    width: 100%;
    min-height: 200px;
}
</style>
