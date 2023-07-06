<template>
  <div :class="{ hidden: hidden }" class="pagination-container">
    <el-pagination
      :background="background"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
import { scrollTo } from "@/utils/scroll-to";
import { computed } from "vue";
import { ElPagination } from "element-plus";

const props = defineProps({
  total: {
    required: true,
    type: Number,
  },
  page: {
    type: Number,
    default: 1,
  },
  limit: {
    type: Number,
    default: 20,
  },
  pageSizes: {
    type: Array<number>,
    default: () => {
      return [10, 20, 30, 50];
    },
  },
  layout: {
    type: String,
    default: "total, sizes, prev, pager, next, jumper",
  },
  background: {
    type: Boolean,
    default: true,
  },
  autoScroll: {
    type: Boolean,
    default: true,
  },
  hidden: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:page", "update:limit", "pagination"]);

const currentPage = computed({
  get: () => {
    return props.page;
  },
  set: (val) => {
    emit("update:page", val);
  },
});

const pageSize = computed({
  get: () => {
    return props.limit;
  },
  set: (val) => {
    emit("update:limit", val);
  },
});

function handleSizeChange(val: number) {
  emit("pagination", { page: currentPage.value, limit: val });
  if (props.autoScroll) {
    scrollTo(0, 800);
  }
}

function handleCurrentChange(val: number) {
  emit("pagination", { page: val, limit: pageSize.value });
  if (props.autoScroll) {
    scrollTo(0, 800);
  }
}
</script>

<style scoped>
.pagination-container {
  background: #fff;
  padding: 32px 16px;
}

.pagination-container.hidden {
  display: none;
}
</style>
