<template>
  <div style="display: inline-block">
    <label class="radio-label" style="padding-left: 0">Filename: </label>
    <el-input
      v-model="filename"
      placeholder="Please enter the file name (default excel-list)"
      style="width: 345px"
    >
      <template #prefix>
        <el-icon class="el-input__icon">
          <span class="iconify el-icon" data-icon="ep:document"></span>
        </el-icon>
      </template>
    </el-input>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import {ElInput,ElIcon} from 'element-plus'

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const filename = computed({
  get: () => {
    return props.modelValue;
  },
  set: (val) => {
    emit("update:modelValue", val);
  },
});
</script>
