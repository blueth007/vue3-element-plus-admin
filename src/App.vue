<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { ElConfigProvider } from 'element-plus'
import { useStore } from './store'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

const locale = ref(zhCn)
const store = useStore()
const size = storeToRefs(store).size

 </script>

<template>
  <el-config-provider :locale="locale" :size="size">
    <router-view></router-view>
  </el-config-provider>
</template>

<style scoped></style>
