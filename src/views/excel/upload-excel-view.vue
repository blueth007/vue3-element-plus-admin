<template>
  <div class="app-container">
    <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
    <el-table :data="tableData" border highlight-current-row style="width: 100%; margin-top: 20px">
      <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" />
    </el-table>
  </div>
</template>

<script setup lang="ts">
import UploadExcelComponent from "@/components/UploadExcel/index.vue";
import { ElMessage, ElTable, ElTableColumn } from "element-plus";
import { toRefs, reactive } from "vue";

const data = reactive({
  tableData: [] as any[],
  tableHeader: [] as string[],
});
const { tableData, tableHeader } = toRefs(data);
function beforeUpload(file: File) {
  const isLt1M = file.size / 1024 / 1024 < 1;

  if (isLt1M) {
    return true;
  }

  ElMessage({
    message: "Please do not upload files larger than 1m in size.",
    type: "warning",
  });
  return false;
}

function handleSuccess({
  results,
  header,
}: {
  results: any[];
  header: string[];
}) {
  data.tableData = results;
  data.tableHeader = header;
}
</script>
