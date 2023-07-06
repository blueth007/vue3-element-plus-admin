<template>
  <div class="app-container">
    <div style="margin-bottm: 20px">
      <FilenameOption v-model="filename" />
      <AutoWidthOption v-model="autoWidth" />
      <BookTypeOption v-model="bookType" />
      <el-button
        :loading="downloadLoading"
        style="margin: 0 20px"
        type="primary"
        @click="handleDownload"
      >
        <span class="iconify el-icon" data-icon="ep:document"></span>
        <span>Export Excel</span>
      </el-button>
      <a
        href="https://panjiachen.github.io/vue-element-admin-site/feature/component/excel.html"
        target="_blank"
        style="margin-left: 15px"
      >
        <el-tag type="info">Documentation</el-tag>
      </a>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading..."
      border
      fit
      highlight-current-row
    >
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
      <el-table-column align="center" label="Date" width="220">
        <template #default="scope">
          <i class="el-icon-time" />
          <span>{{
            parseTime(scope.row.timestamp, "{y}-{m}-{d} {h}:{i}")
          }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script setup lang="ts">
import { fetchList } from "@/api/article";
import { parseTime } from "@/utils";
// options components
import FilenameOption from "./components/FileNameOption.vue";
import AutoWidthOption from "./components/AutoWidthOption.vue";
import BookTypeOption from "./components/BookTypeOption.vue";
import { ElButton, ElTag, ElTable, ElTableColumn } from "element-plus";
import { onBeforeMount, reactive, toRefs } from "vue";

const data = reactive({
  list: [] as any[],
  listLoading: true,
  downloadLoading: false,
  filename: "",
  autoWidth: true,
  bookType: "xlsx",
});
const { list, filename, autoWidth, bookType, downloadLoading, listLoading } =
  toRefs(data);
onBeforeMount(() => {
  fetchData();
});
function fetchData() {
  data.listLoading = true;
  fetchList().then((response) => {
    data.list = response.data.items;
    data.listLoading = false;
  });
}

function handleDownload() {
  data.downloadLoading = true;
  import("@/vendor/Export2Excel").then((excel) => {
    const tHeader = ["Id", "Title", "Author", "Readings", "Date"];
    const filterVal = ["id", "title", "author", "pageviews", "display_time"];
    const list = data.list;
    const result = formatJson(filterVal, list);
    excel.export_json_to_excel({
      header: tHeader,
      data: result,
      filename: data.filename,
      autoWidth: data.autoWidth,
      bookType: data.bookType,
    });
    data.downloadLoading = false;
  });
}

function formatJson(filterVal: string[], jsonData: any[]) {
  return jsonData.map((v) =>
    filterVal.map((j) => {
      if (j === "timestamp") {
        return parseTime(v[j]);
      } else {
        return v[j];
      }
    })
  );
}
</script>
