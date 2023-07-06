<template>
  <div class="app-container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="use clipboard  directly" name="directly">
        <el-input
          v-model="inputData"
          placeholder="Please input"
          style="width: 400px; max-width: 100%"
        />
        <el-button type="primary" @click="handleCopy(inputData, $event)">
          <span class="iconify el-icon" data-icon="ep:document"></span>
          <span>copy</span>
        </el-button>
      </el-tab-pane>
      <el-tab-pane label="use clipboard by v-directive" name="v-directive">
        <el-input
          v-model="inputData"
          placeholder="Please input"
          style="width: 400px; max-width: 100%"
        />
        <el-button
          v-clipboard:copy="inputData"
          v-clipboard:success="clipboardSuccess"
          type="primary"
          :icon="Document"
        >
          copy
        </el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import clip from "@/utils/clipboard"; // use clipboard directly
import vClipboard from "@/directive/clipboard/index"; // use clipboard by v-directive
import { ref } from "vue";
import { ElMessage, ElButton, ElTabPane, ElInput, ElTabs } from "element-plus";
import { Document } from "@element-plus/icons-vue";

const activeName = ref("directly"),
  inputData = ref("https://github.com/PanJiaChen/vue-element-admin");

function handleCopy(text: any, event: Event) {
  clip(text, event);
}

function clipboardSuccess() {
  ElMessage({
    message: "Copy successfully",
    type: "success",
    duration: 1500,
  });
}
</script>
