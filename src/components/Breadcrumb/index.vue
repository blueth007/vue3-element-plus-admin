<template>
  <el-breadcrumb
    separator="/"
    class="bread_crumb inline-flex mx-2 text-lg float-left"
  >
    <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
      <span
        v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
        class="no-redirect"
        >{{ item.meta?.title }}</span
      >
      <a v-else @click.prevent="handleLink(item)">{{ item.meta?.title }}</a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { ElBreadcrumb, ElBreadcrumbItem } from "element-plus";
import { compile } from "path-to-regexp";
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
type RouteMatched = Partial<(typeof $route.matched)[0]>;
const $route = useRoute();
const $router = useRouter();

const levelList = ref<Array<RouteMatched>>([]);
function handleLink(item: RouteMatched) {
  const { redirect, path } = item;
  if (redirect) {
    $router.push(redirect as string);
    return;
  }

  $router.push(pathCompile(path as string));
}
//带参数路由转换
function pathCompile(path: string) {
  // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
  const { params } = $route;
  var toPath = compile(path);
  return toPath(params);
}
watch($route, (n, p) => {
  if ($route.path.startsWith("/redirect/")) {
    return;
  }
  getBread();
});

const getBread = () => {
  let matched = $route.matched.filter(
    (item) => item.meta && item.meta.title
  ) as Array<RouteMatched>;
  const first = matched[0];

  if (!isDashboard(first)) {
    matched = [
      { path: "/dashboard", meta: { title: "Dashboard" } },
      ...matched,
    ];
  }

  levelList.value = matched.filter(
    (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
  );
};
const isDashboard = (view: any) => {
  const name = $route && ($route.name as string);
  if (!name) {
    return false;
  }
  return name.trim().toLocaleLowerCase() === "Dashboard".toLocaleLowerCase();
};

onMounted(() => {
  getBread();
});
</script>

<style scoped></style>
