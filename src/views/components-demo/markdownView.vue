<template>
  <div class="components-container">
    <aside>
      Markdown is based on
      <a href="https://github.com/nhnent/tui.editor" target="_blank">tui.editor</a>
      ，simply wrapped with Vue. Vue3 base on <strong>@toast-ui/editor</strong>
      <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/feature/component/markdownEditor.html">
        Documentation
      </a>
      <p>
        <strong>暂时没有找到为什么不能使用原生的 setMarkdown 和　getHTML
          方法！</strong>initialValue 设置初始值 和 getElementById().innerHTML来获取值
      </p>
    </aside>
    <hr />
    <div class="editor-container">
      <el-tag class="tag-title"> Basic: </el-tag>
      <markdownEditor v-model="content1" height="300px" />
    </div>

    <div class="editor-container">
      <el-tag class="tag-title"> Markdown Mode: </el-tag>
      <markdownEditor v-model="content2" :options="{ hideModeSwitch: true, previewStyle: 'tab' }" height="200px" />
    </div>

    <div class="editor-container">
      <el-tag class="tag-title"> Customize Toolbar: </el-tag>
      <markdownEditor v-model="content3" :options="{ toolbarItems: [['heading'], ['bold'], ['italic']] }" />
    </div>

    <div class="editor-container">
      <el-tag class="tag-title"> I18n: </el-tag>
      <el-alert :closable="false" title="You can change the language of the admin system to see the effect"
        type="success" />
      <markdownEditor v-model="content4" :language="language" height="300px" ref="markdownEditorRef" />
    </div>

    <el-button style="margin-top: 80px" type="primary" @click="getContentHTML">
      <span class="iconify el-icon" data-icon="ep:document"></span>
      <span>Get HTML</span>
    </el-button>
    <div v-html="html" />
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, toRefs } from "vue";

import markdownEditor from "@/components/MarkdownEditor/index.vue";
import { ElButton, ElTag, ElAlert } from "element-plus";

const markdownEditorRef = ref()
const content = `
**This is test**

* vue
* element
* webpack

>1
>>2
>>>3
`;
const data = reactive({
  content1: content,
  content2: content,
  content3: content,
  content4: content,
  html: "",
  languageTypeList: {
    en: "en-US",
    zh: "zh-CN",
    es: "es-ES",
  },
});
const { content1, content2, content3, content4, html } = toRefs(data);

const language = computed(() => {
  return data.languageTypeList["zh"];
});
const getContentHTML = () => {
  html.value = markdownEditorRef.value?.getHTML();
}

</script>

<style scoped>
.editor-container {
  margin-bottom: 30px;
}

.tag-title {
  margin-bottom: 5px;
}
</style>
