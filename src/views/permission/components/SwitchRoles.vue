<template>
  <div>
    <div style="margin-bottom: 15px">Your roles: {{ roles }}</div>
    Switch roles:
    <el-radio-group v-model="switchRoles">
      <el-radio-button label="editor" />
      <el-radio-button label="admin" />
    </el-radio-group>
  </div>
</template>

<script setup lang="ts">
import { ElRadioGroup, ElRadioButton } from "element-plus";
import { ref, computed } from "vue";
import { useStore } from "@/store";
import { useUserStore } from "@/store/user";
const roles = computed(() => useStore().roles);
const $emit = defineEmits(["change"]);

const switchRoles = computed({
  get() {
    return roles.value[0];
  },
  set(val) {
    useUserStore()
      .changeRoles(val)
      .then(() => {
        $emit("change");
      });
  },
});
</script>
