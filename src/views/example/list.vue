<template>
  <div class="app-container" v-if="list.length != 0">
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column align="center" label="ID" width="80">
        <template #default="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="Date">
        <template #default="scope">
          <span>{{
            parseTime(scope.row.timestamp, "{y}-{m}-{d} {h}:{i}")
          }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="Author">
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
          <router-link :to="'/example/edit/' + row.id" class="link-type">
            <span>{{ row.title }}</span>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Actions" width="120">
        <template #default="scope">
          <router-link :to="'/example/edit/' + scope.row.id">
            <el-button type="primary" size="small">
              <span class="iconify mx-1" data-icon="ep:edit"></span> Edit
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      v-model:page="listQuery.page"
      v-model:limit="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script setup lang="ts">
import { parseTime } from "@/utils/index";
import { fetchList } from "@/api/article";
import Pagination from "@/components/Pagination/index.vue"; // Secondary package based on el-pagination
import type { TagProps } from "element-plus";
import { reactive, toRefs } from "vue";
import { ElTableColumn, ElTable, ElTag, ElButton } from "element-plus";

const data = reactive({
  list: [],
  total: 0,
  listLoading: true,
  listQuery: {
    page: 1,
    limit: 20,
  },
});
const { total, listQuery, listLoading, list } = toRefs(data);
function onCreated() {
  getList();
}
onCreated();

function getList() {
  data.listLoading = true;
  fetchList(data.listQuery).then((response) => {
    data.list = response.data.items;
    data.total = response.data.total;
    data.listLoading = false;
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
