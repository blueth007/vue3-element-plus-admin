<template>
  <div class="app-container">
    <switch-roles @change="handleRolesChange" />
  </div>
</template>

<script lang="ts" setup>
import SwitchRoles from "./components/SwitchRoles.vue";
import { useRouter } from "vue-router";
const $router = useRouter();

function handleRolesChange() {
  $router.push({ path: "/permission/index?" + +new Date() });
}
</script>
