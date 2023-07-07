<template>
    <div style="display:inline-block;">
        <label class="radio-label">Book Type: </label>
        <el-select v-model="bookType" style="width:120px;">
            <el-option v-for="item in options" :key="item" :label="item" :value="item" />
        </el-select>
    </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { ElSelect, ElOption } from 'element-plus'
const props = defineProps({
    modelValue: {
        type: String,
        default: 'xlsx'
    }
})

const emit = defineEmits(['input', "update:modelValue"])

const options = ref(['xlsx', 'csv', 'txt'])

const bookType = computed({
    get: () => {
        return props.modelValue
    },
    set: (val) => {
        emit('update:modelValue', val)
    }
})
</script>
