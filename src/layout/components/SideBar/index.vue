<template>
  <el-scrollbar>
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-menu :default-active="activeMenu" active-text-color="#ffd04b" background-color="#545c64" :collapse="isCollapse"
      :collapse-transition="false" router text-color="#fff">
      <!-- 递归动态菜单 -->
      <!-- <menu-item v-for="route in menus" :item="route" :base-path="route.path" :key="route.path"></menu-item> -->
      <SidebarItem v-for="route in menus" :key="route.path" :item="route" :base-path="route.path"></SidebarItem>
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { useStore } from "@/store";
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import type { RouterItem } from "@/router/index";

const store = useStore();
const route = useRoute();

const menus = ref<Array<RouterItem>>();

const { sidebar } = storeToRefs(store)

const isCollapse = computed(() => !sidebar.value.opened)
const showLogo = computed(() => {
  return store.settings.sidebarLogo
})
const activeMenu = computed(() => {
  const { meta, path } = route;
  // if set path, the sidebar will highlight the path you set
  if (meta.activeMenu) {
    return meta.activeMenu;
  }
  return path;
});

onMounted(async () => {
  menus.value = store.permission_routes;
  // console.log(" menus.value:", menus.value,)
});
</script>

<style lang="scss" scoped>
.el-menu {
  height: 100%;
  border-width: 0;
}
</style>
