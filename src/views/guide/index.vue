<template>
  <div class="app-container">
    <aside>
      The guide page is useful for some people who entered the project for the first time. You can briefly introduce the features of the project. Demo
      is based on
      <a href="https://github.com/kamranahmedse/driver.js" target="_blank">driver.js.</a>
    </aside>
    <el-button type="primary" @click.prevent.stop="guide"> Show Guide </el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import Driver from "driver.js";
import "driver.js/dist/driver.min.css";
import steps from "./step";

const driver = ref();
function guide() {
  driver.value.defineSteps(steps);
  driver.value.start();
}

onMounted(() => {
  driver.value = new Driver();
});
</script>

<style lang="scss" scoped></style>
