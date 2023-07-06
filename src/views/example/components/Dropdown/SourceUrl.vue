<template>
  <el-dropdown :show-timeout="100" trigger="click">
    <el-button plain>
      Link
      <i class="el-icon-caret-bottom el-icon--right" />
    </el-button>
    <template #dropdown>
      <el-dropdown-menu class="no-padding no-border" style="width: 400px">
        <el-form-item
          label-width="0px"
          style="margin-bottom: 0px"
          prop="source_url"
        >
          <el-input v-model="source_url" placeholder="Please enter the content">
            <template #prepend> URL </template>
          </el-input>
        </el-form-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { computed } from "vue";
import {
  ElButton,
  ElDropdown,
  ElDropdownMenu,
  ElInput,
  ElForm,
  ElFormItem,
} from "element-plus";

const props = defineProps({
  modelValue: {
    type: String,
    default: "aa",
  },
});
const emit = defineEmits(["input", "update:modelValue"]);
const source_url = computed({
  get: () => {
    return props.modelValue;
  },
  set: (val) => {
    emit("update:modelValue", val);
  },
});
</script>
