<template>
  <div :class="{ show: show }" class="header-search inline-flex mx-3 items-center">
    <svg-icon class-name="search-icon" icon-class="search" @click.stop="click" />
    <el-select ref="headerSearchSelect" v-model="search" :remote-method="querySearch" filterable default-first-option
      remote :loading="loading" placeholder="Search" class="header-search-select" @change="change">
      <el-option v-for="item in options" :key="item.path" :value="item" :label="item.title.join(' > ')" />
    </el-select>
  </div>
</template>

<script setup lang="ts">
// fuse is a lightweight fuzzy-search module
// make search results more in line with expectations
import Fuse from "fuse.js";
import path from "path-browserify";
import { ref, computed, watch, onMounted, watchEffect, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "@/store";

type T_path = { path: string; title: Array<string> };

const store = useStore();
const search = ref("");
const $router = useRouter();
const $route = useRoute();
const options = ref<Array<T_path>>([]);
const searchPool = ref<Array<T_path>>([]);
const show = ref(false);
const fuse = ref();
const headerSearchSelect = ref();
const loading = ref(false);
const routes = computed(() => {
  return store.permission_routes;
});

onMounted(() => {
  searchPool.value = generateRoutes(routes.value);
  initFuse(searchPool.value);
});
watch(show, (n, p) => {
  n ? document.body.addEventListener("click", closed) : document.body.removeEventListener("click", closed);
});
watch(routes, () => {
  searchPool.value = generateRoutes(routes.value);
  initFuse(searchPool.value);
});

const click = () => {
  show.value = !show.value;
  show.value && headerSearchSelect && headerSearchSelect.value.focus();
};
const closed = () => {
  headerSearchSelect && headerSearchSelect.value.blur();
  options.value = [];
  show.value = false;
};

function change(val: any) {
  $router.push(val.path);
  search.value = "";
  options.value = [];
  nextTick(() => {
    show.value = false;
  });
}
function initFuse(list: any) {
  fuse.value = new Fuse(list, {
    shouldSort: true,
    threshold: 0.4,
    location: 0,
    distance: 100,
    //  maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
      {
        name: "title",
        weight: 0.7,
      },
      {
        name: "path",
        weight: 0.3,
      },
    ],
  });
}
//     // Filter out the routes that can be displayed in the sidebar
//     // And generate the internationalized title
function generateRoutes(routes: any[], basePath = "/", prefixTitle: Array<string> = []): Array<T_path> {
  let res: Array<T_path> = [];

  for (const router of routes) {
    // skip hidden router
    if (router.hidden) {
      continue;
    }

    const data: T_path = {
      path: path.resolve(basePath, router.path),
      title: [...prefixTitle],
    };

    if (router.meta && router.meta.title) {
      data.title = [...data.title, router.meta.title];

      if (router.redirect !== "noRedirect") {
        // only push the routes with title
        // special case: need to exclude parent router without redirect
        res.push(data);
      }
    }

    // recursive child routes
    if (router.children) {
      const tempRoutes = generateRoutes(router.children, data.path, data.title);
      if (tempRoutes.length >= 1) {
        res = [...res, ...tempRoutes];
      }
    }
  }
  return res;
}
function querySearch(query: string) {
  loading.value = true;
  if (query !== "") {
    options.value = fuse.value.search(query).map((t: any) => t.item);
  } else {
    options.value = [];
  }
  loading.value = false;
}
</script>

<style lang="scss" scoped>
.header-search {
  .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }

  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    :deep(.el-input__inner) {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }

  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
