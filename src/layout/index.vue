<template>
  <div :class="classObj" class="app-wrapper">
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <side-bar class="sidebar-container" />

    <div :class="{ hasTagsView: needTagsView }" class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <nav-bar></nav-bar>
        <tags-view v-if="needTagsView"></tags-view>
      </div>
      <app-main></app-main>
      <right-panel v-if="showSettings">
        <settings />
      </right-panel>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useStore } from "@/store/index";
import { SideBar, NavBar, Settings, TagsView, AppMain } from "./components";
import RightPanel from "@/components/RightPanel/index.vue";

const m_width = ref("210px");
const store = useStore();

const showSettings = computed(() => store.settings.showSettings);
const sidebar = computed(() => store.app.sidebar);
const device = computed(() => store.app.device);
const needTagsView = computed(() => store.settings.tagsView);
const fixedHeader = computed(() => store.settings.fixedHeader);

const classObj = computed(() => {
  return {
    hideSidebar: !sidebar.value.opened,
    openSidebar: sidebar.value.opened,
    withoutAnimation: sidebar.value.withoutAnimation,
    mobile: device.value === "mobile",
  };
});
const handleClickOutside = () => {
  store.app.closeSideBar({ withoutAnimation: false });
};
</script>

<style scoped lang="scss">
.app-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100%;

  .main-container {
    min-height: 100%;
    -webkit-transition: margin-left 0.18s;
    transition: margin-left 0.18s;
    margin-left: 210px;
    position: relative;
  }

  .sidebar-container {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2000;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - v-bind(m_width));
    transition: width 0.28s;
  }
}

:deep(.el-menu-vertical-demo:not(.el-menu--collapse)) {
  width: 210px;
  min-height: 400px;
  height: 100%;
}

.hideSidebar {
  .main-container {
    margin-left: 64px;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 64px;
  }
}

@import "@/styles/mixin.scss";
@import "@/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.hideSidebar .fixed-header {
  width: calc(100% - 64px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
