<template>
  <div>
    <svg-icon
      :icon-class="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
      @click="handleFull"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import screenfull from "screenfull";
import SvgIcon from "@/components/SvgIcon/index.vue";
const isFullscreen = ref(false);

onMounted(() => {
  init();
});

onUnmounted(() => {
  destory();
});

const handleFull = () => {
  if (!screenfull.isEnabled) {
    return false;
  }
  screenfull.toggle();
  // console.log("toggle screenfull");
};
const change = () => {
  isFullscreen.value = screenfull.isFullscreen;
};

const init = () => {
  if (screenfull.isEnabled) {
    screenfull.on("change", change);
  }
};

const destory = () => {
  if (screenfull.isEnabled) {
    screenfull.off("change", change);
  }
};
</script>

<style lang="scss" scoped></style>
