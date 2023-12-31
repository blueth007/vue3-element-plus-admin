<template>
  <div v-if="!item.hidden">
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        !item.alwaysShow
      "
    >
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{ 'submenu-title-noDropdown': !isNest }"
        >
          <item
            :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"
            :title="onlyOneChild.meta.title"
          />
        </el-menu-item>
      </app-link>
    </template>

    <el-sub-menu v-else ref="subMenu" :index="resolvePath(item.path)">
      <template #title>
        <item
          v-if="item.meta"
          :icon="item.meta && item.meta.icon"
          :title="item.meta.title"
        />
      </template>
      <SidebarItem
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      ></SidebarItem>
    </el-sub-menu>
  </div>
</template>

<script setup lang="ts">
import path from "path-browserify";
import { isExternal } from "@/utils/validate";
import Item from "./Item.vue";
import AppLink from "./Link.vue";
import { ref, computed, onMounted } from "vue";
import type { RouterItem } from "@/router/index";
import { useStore } from "@/store";
import { ElSubMenu, ElMenuItem } from "element-plus";
const props = defineProps({
  // route object
  item: {
    type: Object,
    required: true,
  },
  isNest: {
    type: Boolean,
    default: false,
  },
  basePath: {
    type: String,
    default: "",
  },
});

// To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
// TODO: refactor with render function
const onlyOneChild = ref();
const subMenu = ref();

const device = computed(() => useStore().app.device);
onMounted(() => {
  fixBugIniOS();
});
const hasOneShowingChild = (
  children: Array<RouterItem> = [],
  parent: RouterItem
) => {
  const showingChildren = children.filter((item: RouterItem) => {
    if (item.hidden) {
      return false;
    } else {
      // Temp set(will be used if only has one showing child)
      onlyOneChild.value = item;
      return true;
    }
  });

  // When there is only one child router, the child router is displayed by default
  if (showingChildren.length === 1) {
    return true;
  }

  // Show parent if there are no child router to display
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: "", noShowingChildren: true };
    return true;
  }

  return false;
};
const resolvePath = (routePath: string) => {
  if (isExternal(routePath)) {
    return routePath;
  }
  if (isExternal(props.basePath)) {
    return props.basePath;
  }
  return path.resolve(props.basePath, routePath);
};
//fixIOSBug.js
const fixBugIniOS = () => {
  const $subMenu = subMenu.value;
  if ($subMenu) {
    const handleMouseleave = $subMenu.handleMouseleave;
    $subMenu.handleMouseleave = (e: any) => {
      if (device.value === "mobile") {
        return;
      }
      handleMouseleave(e);
    };
  }
};
</script>
