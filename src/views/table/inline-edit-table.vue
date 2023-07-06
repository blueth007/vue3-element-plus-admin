<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column align="center" label="ID" width="80">
        <template #default="{ row }">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="Date">
        <template #default="{ row }">
          <span>{{ parseTime(row.timestamp, "{y}-{m}-{d} {h}:{i}") }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="Author">
        <template #default="{ row }">
          <span>{{ row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" label="Importance">
        <template #default="{ row }">
          <span v-if="row.importance">
            <svg-icon
              v-for="n in row.importance"
              :key="n"
              icon-class="star"
              class="meta-item__icon"
            />
          </span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="Status" width="110">
        <template #default="{ row }">
          <el-tag :type="statusFilter(row.status)">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column min-width="300px" label="Title">
        <template #default="{ row }">
          <template v-if="row.edit">
            <el-input v-model="row.title" class="edit-input" size="small" />
            <el-button
              class="cancel-btn"
              size="small"
              type="warning"
              @click="cancelEdit(row)"
            >
              <span class="iconify mx-1" data-icon="ep:circle-close"></span>
              cancel
            </el-button>
          </template>
          <span v-else>{{ row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Actions" width="120">
        <template #default="{ row }">
          <el-button
            v-if="row.edit"
            type="success"
            size="small"
            @click="confirmEdit(row)"
          >
            <span class="iconify mx-1" data-icon="ep:circle-check"></span> Ok
          </el-button>
          <el-button
            v-else
            type="primary"
            size="small"
            @click="row.edit = !row.edit"
          >
            <span class="iconify mx-1" data-icon="ep:edit"></span> Edit
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { fetchList } from "@/api/article";
import { parseTime } from "@/utils/index";
import { toRefs, reactive, onMounted } from "vue";
import {
  ElMessage,
  ElTable,
  ElTableColumn,
  ElButton,
  ElInput,
  ElTag,
  ElLoading,
} from "element-plus";
import type { TagProps } from "element-plus";
import SvgIcon from "@/components/SvgIcon/index.vue";

type Item = { type: TagProps["type"]; label: string };
const data = reactive({
  list: [],
  listLoading: true,
  listQuery: {
    page: 1,
    limit: 10,
  },
});
onMounted(() => {
  getList();
});
const { list, listLoading } = toRefs(data);
async function getList() {
  data.listLoading = true;
  const { data: result } = await fetchList(data.listQuery);
  const items = result.items;
  data.list = items.map((v: any) => {
    v.edit = false;
    // set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
    v.originalTitle = v.title; //  will be used when user click the cancel botton
    return v;
  });
  data.listLoading = false;
}

function cancelEdit(row: any) {
  row.title = row.originalTitle;
  row.edit = false;

  ElMessage({
    message: "The title has been restored to the original value",
    type: "warning",
  });
}

function confirmEdit(row: any) {
  row.edit = false;
  row.originalTitle = row.title;

  ElMessage({
    message: "The title has been edited",
    type: "success",
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

<style scoped>
.edit-input {
  padding-right: 100px;
}

.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
