<template>
  <el-dropdown :hide-on-click="false" :show-timeout="100" trigger="click">
    <el-button plain>
      Platfroms({{ platforms.length }})
      <i class="el-icon-caret-bottom el-icon--right" />
    </el-button>
    <template #dropdown>
      <el-dropdown-menu class="no-border">
        <el-checkbox-group v-model="platforms" style="padding: 5px 15px">
          <el-checkbox
            v-for="item in platformsOptions"
            :key="item.key"
            :label="item.key"
          >
            {{ item.name }}
          </el-checkbox>
        </el-checkbox-group>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { computed, reactive, toRefs } from "vue";
import {
  ElButton,
  ElDropdown,
  ElDropdownMenu,
  ElCheckbox,
  ElCheckboxGroup,
} from "element-plus";
const props = defineProps({
  modelValue: {
    type: Array<string>,
    default: () => [],
  },
});

const emit = defineEmits(["input", "update:modelValue"]);

const data = reactive({
  platformsOptions: [
    { key: "a-platform", name: "a-platform" },
    { key: "b-platform", name: "b-platform" },
    { key: "c-platform", name: "c-platform" },
  ],
});
const { platformsOptions } = toRefs(data);
const platforms = computed({
  get: () => {
    return props.modelValue;
  },
  set: (val) => {
    emit("update:modelValue", val);
  },
});
</script>
