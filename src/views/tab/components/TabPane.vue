<template>
  <el-table :data="list" border fit highlight-current-row style="width: 100%">
    <el-table-column
      v-loading="loading"
      align="center"
      label="ID"
      width="65"
      element-loading-text="请给我点时间！"
    >
      <template #default="scope">
        <span>{{ scope.row.id }}</span>
      </template>
    </el-table-column>

    <el-table-column width="180px" align="center" label="Date">
      <template #default="scope">
        <span>{{ parseTime(scope.row.timestamp, "{y}-{m}-{d} {h}:{i}") }}</span>
      </template>
    </el-table-column>

    <el-table-column min-width="300px" label="Title">
      <template #default="{ row }">
        <span>{{ row.title }}</span>
        <el-tag>{{ row.type }}</el-tag>
      </template>
    </el-table-column>

    <el-table-column width="110px" align="center" label="Author">
      <template #default="scope">
        <span>{{ scope.row.author }}</span>
      </template>
    </el-table-column>

    <el-table-column width="120px" label="Importance">
      <template #default="scope">
        <span v-if="scope.row.importance">
          <svg-icon
            v-for="n in scope.row.importance"
            :key="n"
            icon-class="star"
          />
        </span>
      </template>
    </el-table-column>

    <el-table-column align="center" label="Readings" width="95">
      <template #default="scope">
        <span>{{ scope.row.pageviews }}</span>
      </template>
    </el-table-column>

    <el-table-column class-name="status-col" label="Status" width="110">
      <template #default="{ row }">
        <el-tag :type="statusFilter(row.status)">
          {{ row.status }}
        </el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { parseTime } from "@/utils";
import { fetchList } from "@/api/article";
import { onBeforeMount, reactive, toRefs } from "vue";
import type { TagProps } from "element-plus";
import { ElTable, ElTableColumn, ElTag } from "element-plus";
import SvgIcon from "@/components/SvgIcon/index.vue";
import { vLoading } from 'element-plus/es/components/loading/src/directive'

const props = defineProps({
  type: {
    type: String,
    default: "CN",
  },
});

const emit = defineEmits(["create"]);

const data = reactive({
  list: [],
  listQuery: {
    page: 1,
    limit: 5,
    type: props.type,
    sort: "+id",
  },
  loading: false,
});
const { list, loading } = toRefs(data);
onBeforeMount(() => {
  getList();
});

function getList() {
  data.loading = true;
  emit("create"); // for test
  fetchList(data.listQuery).then((response) => {
    data.list = response.data.items;
    data.loading = false;
  });
}

function statusFilter(status: string) {
  const statusMap: { [key: string]: TagProps["type"] } = {
    published: "success",
    draft: "info",
    deleted: "danger",
  };
  return statusMap[status];
}
</script>
