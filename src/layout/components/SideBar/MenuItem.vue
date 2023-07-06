<template>
  <template v-if="item && !item.hidden">
    <template
      v-if="hasOneShowingChild(item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren) && !item.alwaysShow">
      <a :href="onlyOneChild.path" target="_blank" v-if="isExternal(onlyOneChild.path)" class="el-menu-item"
        role="menuitem">
        <el-icon class="inline-block">
          <svg-icon :icon-class="onlyOneChild.meta?.icon || (item.meta && item.meta.icon)"
            class-name="disabled"></svg-icon>
        </el-icon>
        <span slot="title" :data-link="onlyOneChild.path">{{ onlyOneChild.meta?.title || item.name || onlyOneChild.name }}
        </span>
      </a>
      <el-menu-item :index="onlyOneChild.path" v-else>
        <el-icon class="inline-block" v-if="onlyOneChild.meta?.icon">
          <svg-icon :icon-class="onlyOneChild.meta?.icon || (item.meta && item.meta.icon)"
            class-name="disabled"></svg-icon>
        </el-icon>
        <span slot="title" :data-link="item.path">{{ onlyOneChild.meta?.title || item.name || onlyOneChild.name }} </span>
      </el-menu-item>
    </template>
    <el-sub-menu :index="item.path ?? '/'" v-else>
      <template #title>
        <el-icon class="inline-block" v-if="item.meta?.icon">
          <svg-icon :icon-class="item.meta?.icon" class-name="disabled"></svg-icon>
        </el-icon>
        <span :data-link="item.path">{{ item.name || item.meta?.title }} </span>
      </template>
      <MenuItem v-for="route in item.children" :item="route" :basePath="resolvePath(item.path as string)">
      </MenuItem>
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
import { onMounted, ref, PropType } from "vue";
import type { RouterItem } from "@/router/index";
import { isExternal } from "@/utils/validate";
import path from "path-browserify";

const props = defineProps({
  item: { type: Object as PropType<RouterItem>, require: true },
  basePath: { type: String, default: "" },
});

onMounted(() => {
  // console.log("basePath:", props.basePath)
});

const onlyOneChild = ref();

function hasOneShowingChild(parent: any) {
  let children = parent.children || [];

  onlyOneChild.value = parent;
  const showingChildren = children.filter((item: any) => {
    if (item.hidden) {
      return false;
    } else {
      // Temp set(will be used if only has one showing child)
      //   onlyOneChild.value = { ...item, path: parent.path == "/" ? parent.path + item.path : parent.path + "/" + item.path };
      onlyOneChild.value = { ...item, path: resolvePath(item.path) };
      return true;
    }
  });

  // When there is only one child router, the child router is displayed by default
  if (showingChildren.length === 1) {
    return true;
  }

  // Show parent if there are no child router to display
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: props.basePath + "/" + parent.path, noShowingChildren: true };
    return true;
  }

  return false;
}
function resolvePath(routePath: string) {
  if (isExternal(routePath)) {
    return routePath;
  }
  if (isExternal(props.basePath)) {
    return props.basePath;
  }
  return path.resolve(props.basePath, routePath);
}
</script>
