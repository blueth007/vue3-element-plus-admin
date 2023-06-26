<template>
  <el-dropdown trigger="click" @command="handleSetSize">
    <div>
      <svg-icon class-name="size-icon" icon-class="size" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="item of sizeOptions" :key="item.value" :disabled="size === item.value"
          :command="item.value">
          {{ item.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, inject } from "vue";
import { useStore } from "@/store";
import { useTagsViewStore } from "@/store/tagsView";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";

const changeConfigProviderSize = inject("changeConfigProviderSize") as Function

const tagsView = useTagsViewStore();
const $store = useStore();
const $route = useRoute();
const $router = useRouter();

const sizeOptions = ref([
  { label: "Large", value: "large" },
  { label: "Default", value: "default" },
  { label: "Small", value: "small" },

]);

const size = computed(() => {
  return $store.size
});

function handleSetSize(size: string) {
  //   this.$ELEMENT.size = size
  //   this.$store.dispatch('app/setSize', size)
  $store.app.setSize(size)
  // refreshView()  //只能刷新 不能改变size
  changeConfigProviderSize(size) //通过全局注入直接改变size
  ElMessage({
    message: 'Switch Size Success',
    type: 'success'
  })
}

function refreshView() {
  // In order to make the cached page re-rendered
  //   this.$store.dispatch('tagsView/delAllCachedViews', this.$route)
  tagsView.delAllCachedViews();

  const { fullPath } = $route;

  nextTick(() => {
    $router.replace({
      path: "/redirect" + fullPath,
    });
  });
}
</script>

<style scoped></style>
