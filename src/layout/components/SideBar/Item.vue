<script setup lang="ts">
import SvgIcon from "@/components/SvgIcon/index.vue";
defineProps({
  icon: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
});
</script>
<template>
  <div style="display: inline-block">
    <svg-icon :icon-class="icon" v-if="icon" />
    <span slot="title" v-if="title">{{ title }}</span>
  </div>
</template>
