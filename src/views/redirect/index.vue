<script lang="ts" setup>
//import { onBeforeMount, h, onMounted, inject } from "vue";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();

const { params, query } = route;
const { path } = params;
router.replace({ path: "/" + path, query });
</script>
<template>
  <div></div>
</template>
