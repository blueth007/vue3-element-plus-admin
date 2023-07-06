<template>
  <el-select
    ref="dragSelect"
    v-model="selectVal"
    v-bind="$attrs"
    class="drag-select"
    multiple
  >
    <slot />
  </el-select>
</template>

<script lang="ts" setup>
import Sortable from "sortablejs";
import { computed, onMounted, ref } from "vue";
import { ElSelect } from "element-plus";

const props = defineProps({
  modelValue: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const dragSelect = ref();

const selectVal = computed({
  get: () => {
    return [...props.modelValue];
  },
  set: (val) => {
    emit("update:modelValue", [...val]);
  },
});

onMounted(() => {
  setSort();
});

function setSort() {
  const el = dragSelect.value.$el.querySelectorAll(
    ".el-select__tags > span"
  )[0];
  // /* Warn: Unknown source: sortable */
  const sortable = Sortable.create(el, {
    ghostClass: "sortable-ghost", // Class name for the drop placeholder,
    setData: function (dataTransfer: {
      setData: (arg0: string, arg1: string) => void;
    }) {
      dataTransfer.setData("Text", "");
      // to avoid Firefox bug
      // Detail see : https://github.com/RubaXa/Sortable/issues/1012
    },
    onEnd: (evt: any) => {
      const targetRow = props.modelValue.splice(evt.oldIndex, 1)[0];
      props.modelValue.splice(evt.newIndex, 0, targetRow);
    },
  });
}
</script>

<style scoped>
.drag-select :deep(.sortable-ghost) {
  opacity: 0.8;
  color: #fff !important;
  background: #42b983 !important;
}

.drag-select :deep(.el-tag) {
  cursor: pointer;
}
</style>
