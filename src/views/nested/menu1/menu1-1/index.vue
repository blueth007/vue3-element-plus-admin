<template>
  <div style="padding:30px;">
    <el-alert :closable="false" title="menu 1-1" type="success">
      <router-view></router-view>
    </el-alert>
  </div>
</template>
<script setup lang="ts">
import { ElAlert } from 'element-plus';
</script>
