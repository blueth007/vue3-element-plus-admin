<template>
  <div class="chart-container">
    <Keyboard height="100%" width="100%" />
  </div>
</template>

<script setup lang="ts">
import Keyboard from "@/components/Charts/Keyboard.vue";
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>
