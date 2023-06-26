<template>
  <div class="dashboard-container">
    <component :is="views[currentRole]" />
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onBeforeMount } from "vue";
import { useStore } from "@/store";
import adminDashboard from "./admin/index.vue";
import editorDashboard from "./editor/index.vue";

const store = useStore();
const views: { [key: string]: any } = {
  editorDashboard,
  adminDashboard,
};
const currentRole = ref("adminDashboard");
const { roles } = store;
onBeforeMount(() => {
  if (!roles.includes("admin")) {
    currentRole.value = "editorDashboard";
  }
});
</script>

<style lang="scss" scoped></style>
