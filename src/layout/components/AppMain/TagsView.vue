<template>
  <div id="tags-view-container" class="tags-view-container">
    <scroll-pane ref="scroll" class="tags-view-wrapper" :link_tag="link_tag">
      <template #default>
        <el-tag
          class="tags-view-item"
          :closable="!isAffix(tag)"
          v-for="tag in visitedViews"
          :key="tag.path"
          :effect="isActive(tag) ? 'dark' : 'light'"
          @close="!isAffix(tag) ? closeSelectedTag(tag) : ''"
          :class="isActive(tag) ? 'active' : ''"
          @contextmenu.prevent.native="openMenu(tag, $event)"
        >
          <template #default>
            <router-link
              ref="link_tag"
              :to="{ path: tag.path + '', query: tag.query }"
            >
              {{ tag.title || tag.name }}
            </router-link>
          </template>
        </el-tag>
      </template>
    </scroll-pane>
    <ul
      v-show="visible && selectedTag"
      :style="{ left: left + 'px', top: top + 'px' }"
      class="contextmenu"
    >
      <li @click="refreshSelectedTag(selectedTag)">Refresh</li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">
        Close
      </li>
      <li @click="closeOthersTags">Close Others</li>
      <li @click="closeAllTags(selectedTag)">Close All</li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from "@/store";
import { computed, nextTick, onMounted, ref, watch, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElTag } from "element-plus";
import scrollPane from "./scrollPane.vue";
import { useTagsViewStore } from "@/store/tagsView";
import type { RouteItem, RouterItem } from "@/router";

const $route = useRoute();
const $router = useRouter();
const store = useStore();
const tagsView = useTagsViewStore();
// const visitedViews = storeToRefs(store.visitedViews);

const scroll = ref();
const link_tag = ref<Array<any>>([]);
const visible = ref(false);
const selectedTag = ref<RouteItem>({});
const affixTags = ref<Array<RouteItem>>([]);
const top = ref(0);
const left = ref(0);

const visitedViews = computed(() => {
  return store.visitedViews;
});
const routes = computed(() => {
  return store.permission_routes;
});

const closeSelectedTag = (view: RouteItem) => {
  // console.log("closing selected tag:", view);
  let index = -1;
  visitedViews.value.some((v: RouteItem, n: number) => {
    v.path == view.path && (index = n);
  });
  tagsView.delView(view).then(({ visitedViews }) => {
    // console.log("after: delView", index);
    if (isActive(view)) {
      // toLastView(visitedViews, view); // move to last view
      // to move before current view
      if (visitedViews.length > 1) {
        $router.push(visitedViews[index - 1]);
      }
    }
  });
};
function toLastView(visitedViews: RouteItem[], view: RouteItem) {
  const latestView = visitedViews.slice(-1)[0];
  if (latestView) {
    $router.push(latestView.fullPath as string);
  } else {
    // now the default is to redirect to the home page if there is no tags-view,
    // you can adjust it according to your needs.
    if (view.name === "Dashboard") {
      // to reload home page
      $router.replace({ path: "/redirect" + view.fullPath });
    } else {
      $router.push("/");
    }
  }
}

const refreshSelectedTag = (view: RouteItem) => {
  tagsView.delCachedView(view).then(async () => {
    const { fullPath } = view;
    await nextTick();

    $router.replace({
      path: "/redirect" + fullPath,
    });
  });
};
const closeAllTags = (view: RouteItem) => {
  tagsView.delAllViews().then(({ visitedViews }) => {
    if (affixTags.value.some((tag: RouteItem) => tag.path === view.path)) {
      return;
    }
    toLastView(visitedViews, view);
  });
};
const closeOthersTags = () => {
  // console.log(selectedTag.value, $route);
  const { path, query, params } = selectedTag.value;
  $router.push({ path, query, params });
  tagsView.delOthersViews(selectedTag.value).then(() => {
    moveToCurrentTag();
  });
};

const isAffix = (tag: RouteItem) => {
  return (tag.meta && tag.meta.affix) || false;
};
const isActive = (route: RouteItem) => {
  return route.path === $route.path;
};

function filterAffixTags(
  routes: Array<RouteItem>,
  basePath: string = "/"
): Array<RouteItem> {
  let tags: Array<RouteItem> = [];
  routes.forEach((route: any) => {
    if (route.meta && route.meta.affix) {
      const tagPath = (basePath + "/" + route.path).replace("\/\/", "\/");
      tags.push({
        fullPath: tagPath,
        path: tagPath,
        name: route.name,
        meta: { ...route.meta },
      });
    }
    if (route.children) {
      const tempTags = filterAffixTags(route.children, route.path);
      if (tempTags.length >= 1) {
        tags = [...tags, ...tempTags];
      }
    }
  });
  return tags;
}

function initTags() {
  affixTags.value = filterAffixTags(routes.value);
  for (const tag of affixTags.value) {
    // Must have tag name
    if (tag.name) {
      // $store.dispatch('tagsView/addVisitedView', tag)
      tagsView.addVisitedView(tag);
    }
  }
}

function addTags() {
  const { name } = $route;
  if (name) {
    // $store.dispatch('tagsView/addView', $route)
    tagsView.addView($route);
  }
  return false;
}

const openMenu = (tag: RouteItem, e: any) => {
  const menuMinWidth = 105;
  const $el = scroll.value.$el;
  const offsetLeft = $el.getBoundingClientRect().left; // container margin left
  const offsetWidth = $el.offsetWidth; // container width
  const maxLeft = offsetWidth - menuMinWidth; // left boundary
  const _left = e.clientX - offsetLeft + 15; // 15: margin right
  //console.log("openMenu", $el, $el.getBoundingClientRect(), offsetLeft, e.clientX, _left, offsetWidth, maxLeft); //
  if (_left > maxLeft) {
    left.value = maxLeft;
  } else {
    left.value = _left;
  }
  top.value = e.clientY;
  visible.value = true;
  selectedTag.value = tag;
};
const moveToCurrentTag = async () => {
  const tags: Array<any> = link_tag.value || [];
  // console.log("tags", tags, $route.path);

  await nextTick();
  for (const tag of tags) {
    if (tag.to.path === $route.path) {
      // console.log("move to current tag");
      //move to current tag
      scroll.value.moveToTarget(tag);

      // when query is different then update
      // router-link 上没有fullpath属性
      if (tag.to.path !== $route.fullPath) {
        // console.log("updateVisitedView", $route.fullPath);
        tagsView.updateVisitedView($route);
      }
      break;
    }
  }
};
function closeMenu() {
  visible.value = false;
}
onMounted(() => {
  initTags();
  addTags();
});

watch($route, (now, pre) => {
  addTags();
  moveToCurrentTag();
});

watchEffect(async () => {
  visible.value
    ? document.body.addEventListener("click", closeMenu)
    : document.body.removeEventListener("click", closeMenu);
});
</script>

<style lang="scss" scope>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);

  .tags-view-wrapper {
    .tags-view-item {
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;

      &:first-of-type {
        margin-left: 15px;
      }

      &:last-of-type {
        margin-right: 15px;
      }

      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;

        &::before {
          content: "";
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }

  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);

    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;

      &:hover {
        background: #eee;
      }
    }
  }
}

//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;

      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }

      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
