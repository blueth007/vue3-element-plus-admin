<template>
    <div class="components-container">
        <aside>
            components has draggable in element-plus,so we not need to create a el-drag-dialog directive.
            <p>组件el-dialog有draggbale 属性 不需要在创建 el-drag-dialog 指令</p>
        </aside>
        <el-button type="primary" @click="dialogTableVisible = true">
            open a Drag Dialog
        </el-button>
        <el-dialog v-model="dialogTableVisible" title="Shipping address" draggable>
                       <el-select ref="select" v-model="value" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <el-table :data="gridData">
                <el-table-column property="date" label="Date" width="150" />
                <el-table-column property="name" label="Name" width="200" />
                <el-table-column property="address" label="Address" />
            </el-table>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';


const dialogTableVisible = ref(false)
const value = ref('')
const options = ref([
    { value: '选项1', label: '黄金糕' },
    { value: '选项2', label: '双皮奶' },
    { value: '选项3', label: '蚵仔煎' },
    { value: '选项4', label: '龙须面' }
])  //will hold an array of objects
const gridData = ref([{
    date: '2016-05-02',
    name: 'John Smith',
    address: 'No.1518,  Jinshajiang Road, Putuo District'
}, {
    date: '2016-05-04',
    name: 'John Smith',
    address: 'No.1518,  Jinshajiang Road, Putuo District'
}, {
    date: '2016-05-01',
    name: 'John Smith',
    address: 'No.1518,  Jinshajiang Road, Putuo District'
}, {
    date: '2016-05-03',
    name: 'John Smith',
    address: 'No.1518,  Jinshajiang Road, Putuo District'
}]);//will hold an array of objects with a date, name, and address



</script>