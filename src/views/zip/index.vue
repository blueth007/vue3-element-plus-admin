<template>
    <div class="app-container">
        <el-input v-model="filename" placeholder="Please enter the file name (default file)" style="width:300px;">
            <template #prepend>
                <span class="iconify el-icon" el-icon data-icon="ep:document"></span>
            </template>
        </el-input>
        <el-button :loading="downloadLoading" type="primary" @click="handleDownload">
            <span class="iconify el-icon" data-icon="ep:document"></span> <span>Export Zip</span>
        </el-button>
        <el-table v-loading="listLoading" :data="list" element-loading-text="拼命加载中" border fit highlight-current-row>
            <el-table-column align="center" label="ID" width="95">
                <template #default="scope">
                    {{ scope.$index }}
                </template>
            </el-table-column>
            <el-table-column label="Title">
                <template #default="scope">
                    {{ scope.row.title }}
                </template>
            </el-table-column>
            <el-table-column label="Author" width="95" align="center">
                <template #default="scope">
                    <el-tag>{{ scope.row.author }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="Readings" width="115" align="center">
                <template #default="scope">
                    {{ scope.row.pageviews }}
                </template>
            </el-table-column>
            <el-table-column align="center" label="Date" width="220">
                <template #default="scope">
                    <i class="el-icon-time" />
                    <span>{{ scope.row.display_time }}</span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup lang="ts">
import { fetchList } from '@/api/article'
import { reactive, toRefs } from 'vue'

const data = reactive({
    list: [] as any[],
    listLoading: true,
    downloadLoading: false,
    filename: ''
})
const { list, listLoading, downloadLoading, filename } = toRefs(data)

function onCreated() {
    fetchData()
}
onCreated()

async function fetchData() {
    data.listLoading = true
    const { data: result } = await fetchList()
    data.list = result.items
    data.listLoading = false
}

function handleDownload() {
    data.downloadLoading = true
    import('@/vendor/Export2Zip').then(zip => {
        const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date']
        const filterVal = ['id', 'title', 'author', 'pageviews', 'display_time']
        const list = data.list
        const result = formatJson(filterVal, list)
        zip.export_txt_to_zip(tHeader, result, data.filename, data.filename)
        data.downloadLoading = false
    })
}

function formatJson(filterVal: string[], jsonData: any[]) {
    return jsonData.map(v => filterVal.map(j => v[j]))
}
</script>
