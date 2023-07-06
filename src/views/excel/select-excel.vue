<template>
  <div class="app-container">
    <el-input
      v-model="filename"
      placeholder="Please enter the file name (default excel-list)"
      style="width: 350px"
    >
      <template #prefix>
        <el-icon class="el-input__icon">
          <span class="iconify el-icon" data-icon="ep:document"></span>
        </el-icon>
      </template>
    </el-input>
    <el-button
      :loading="downloadLoading"
      type="primary"
      @click="handleDownload"
    >
      <span class="iconify el-icon" data-icon="ep:document"></span>
      <span>Export Selected Items</span>
    </el-button>
    <a
      href="https://panjiachen.github.io/vue-element-admin-site/feature/component/excel.html"
      target="_blank"
      style="margin-left: 15px"
    >
      <el-tag type="info">Documentation</el-tag>
    </a>
    <el-table
      ref="multipleTable"
      v-loading="listLoading"
      :data="list"
      element-loading-text="拼命加载中"
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center" />
      <el-table-column align="center" label="Id" width="95">
        <template #default="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template #default="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="Author" width="110" align="center">
        <template #default="scope">
          <el-tag>{{ scope.row.author }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Readings" width="115" align="center">
        <template #default="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="PDate" width="220">
        <template #default="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { fetchList } from "@/api/article";

import {
  ElMessage,
  ElButton,
  ElTag,
  ElTable,
  ElIcon,
  ElInput,
  ElTableColumn,
} from "element-plus";

import { onBeforeMount, reactive, ref, toRefs } from "vue";
const multipleTable = ref<InstanceType<typeof ElTable>>();

const data = reactive({
  list: [] as any[],
  listLoading: true,
  multipleSelection: [] as any[],
  downloadLoading: false,
  filename: "",
  listQuery: {
    page: 1,
    limit: 20,
  },
});
const { list, listLoading, filename, downloadLoading } = toRefs(data);

onBeforeMount(() => {
  fetchData();
});

function fetchData() {
  data.listLoading = true;
  fetchList(data.listQuery).then((response) => {
    data.list = response.data.items;
    data.listLoading = false;
  });
}

function handleSelectionChange(val: any[]) {
  data.multipleSelection = val;
}

function handleDownload() {
  if (data.multipleSelection.length) {
    data.downloadLoading = true;
    import("@/vendor/Export2Excel").then((excel) => {
      const tHeader = ["Id", "Title", "Author", "Readings", "Date"];
      const filterVal = ["id", "title", "author", "pageviews", "display_time"];
      const list = data.multipleSelection;
      const result = formatJson(filterVal, list);
      excel.export_json_to_excel({
        header: tHeader,
        data: result,
        filename: data.filename,
      });
      multipleTable.value?.clearSelection();
      data.downloadLoading = false;
    });
  } else {
    /* Warn: Unknown source: $message */
    ElMessage({
      message: "Please select at least one item",
      type: "warning",
    });
  }
}

function formatJson(filterVal: string[], jsonData: any[]) {
  return jsonData.map((v) => filterVal.map((j) => v[j]));
}
</script>
