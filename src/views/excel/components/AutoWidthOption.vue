<template>
    <div style="display:inline-block;">
        <label class="radio-label">Cell Auto-Width: </label>
        <el-radio-group v-model="autoWidth">
            <el-radio :label="true" border>
                True
            </el-radio>
            <el-radio :label="false" border>
                False
            </el-radio>
        </el-radio-group>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ElRadio, ElRadioGroup } from 'element-plus'
const props = defineProps({
    modelValue: {
        type: Boolean,
        default: true
    }
})

const emit = defineEmits(['input', 'update:modelValue'])

const autoWidth = computed({
    get: () => {
        return props.modelValue
    },
    set: (val) => {
        emit('update:modelValue', val)
    }
})
</script>
