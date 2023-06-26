<template>
  <el-table :data="list" style="width: 100%; padding-top: 15px">
    <el-table-column label="Order_No" min-width="200">
      <template #default="scope">
        {{ orderNoFilter(scope.row.order_no) }}
      </template>
    </el-table-column>
    <el-table-column label="Price" width="195" align="center">
      <template #default="scope"> ¥{{ toThousandFilter(scope.row.price) }} </template>
    </el-table-column>
    <el-table-column label="Status" width="100" align="center">
      <template #default="{ row }">
        <el-tag :type="statusFilter(row.status)">
          {{ row.status }}
        </el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { transactionList } from "@/api/remote-search";
import { ref, onMounted } from "vue";
import { toThousandFilter } from "@/utils/filters";
type ListItem = {
  order_no: string;
  timestamp: string;
  username: string;
  price: number;
  status: string;
};

const list = ref<Array<ListItem>>([]);
onMounted(() => {
  fetchData();
});

function fetchData() {
  transactionList().then((response: any) => {
    list.value = response.data.items.slice(0, 8);
  });
}

function statusFilter(status: string) {
  const statusMap: { [key: string]: string } = {
    success: "success",
    pending: "danger",
  };
  return statusMap[status];
}

function orderNoFilter(str: string) {
  return str.substring(0, 30);
}
</script>
