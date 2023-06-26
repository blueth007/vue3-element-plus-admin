<template>
  <div class="icon_toggle inline expand text-2xl float-left h-12" style="padding: 0 15px;" @click="emit('toggleClick')">
    <span :class="isActive ? '' : 'inline-block is-active'">
      <span class="iconify inline" data-icon="ep:fold" data-inline="false"></span>
    </span>

  </div>
</template>
<script setup lang="ts">
defineProps({
  isActive: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["toggleClick"]);
</script>
<style scoped >
.is-active {
  transform: rotate(180deg);
}
</style>

