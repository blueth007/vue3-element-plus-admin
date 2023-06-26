<script setup lang="ts">
import { provide, reactive, ref } from 'vue'
import { ElConfigProvider } from 'element-plus'
import Cookies from 'js-cookie'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

const locale = ref(zhCn)
enum ISize {
  default = 'default',
  small = 'small',
  large = 'large',
}

const cookies_size = Cookies.get('size') || "default";
const sizeKey: keyof typeof ISize = cookies_size as keyof typeof ISize;
const size = ref(ISize[sizeKey])


const changSize = (newSize: string) => {
  let sizeKey: keyof typeof ISize = newSize as keyof typeof ISize;
  size.value = ISize[sizeKey]
}
provide("changeConfigProviderSize", changSize)

</script>

<template>
  <el-config-provider :locale="locale" :size="size">
    <router-view></router-view>
  </el-config-provider>
</template>

<style scoped></style>
