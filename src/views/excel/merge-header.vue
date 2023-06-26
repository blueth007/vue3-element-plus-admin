<template>
    <div class="app-container">

        <el-button :loading="downloadLoading" style="margin-bottom:20px" type="primary" @click="handleDownload">
            <span class="iconify mx-1" data-icon="ep:document"></span>
            Export
        </el-button>

        <el-table ref="multipleTable" v-loading="listLoading" :data="list" element-loading-text="Loading" border fit
            highlight-current-row>
            <el-table-column align="center" label="Id" width="95">
                <template #default="scope">
                    {{ scope.$index }}
                </template>
            </el-table-column>
            <el-table-column label="Main Information" align="center">
                <el-table-column label="Title">
                    <template #default="scope">
                        {{ scope.row.title }}
                    </template>
                </el-table-column>
                <el-table-column label="Author" width="110" align="center">
                    <template #default="scope">
                        <el-tag>{{ scope.row.author }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="Readings" width="115" align="center">
                    <template #default="scope">
                        {{ scope.row.pageviews }}
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column align="center" label="Date" width="220">
                <template #default="scope">
                    <i class="el-icon-time" />
                    <span>{{ parseTime(scope.row.timestamp, '{y}-{m}-{d} {h}:{i}') }}</span>
                </template>
            </el-table-column>
        </el-table>

    </div>
</template>

<script setup lang="ts">
import { fetchList } from '@/api/article'
import { parseTime } from '@/utils'
import { toRefs, reactive, onBeforeMount } from 'vue'

const data = reactive({
    list: [] as any[],
    listLoading: true,
    downloadLoading: false
    , listQuery: {
        page: 1,
        limit: 20
    }
})
const { list, listLoading, downloadLoading } = toRefs(data)
onBeforeMount(() => {
    fetchData()
})


function fetchData() {
    data.listLoading = true
    fetchList(data.listQuery).then(response => {
        data.list = response.data.items
        data.listLoading = false
    })
}

function handleDownload() {
    data.downloadLoading = true
    import('@/vendor/Export2Excel').then(excel => {
        const multiHeader = [
            ['Id', 'Main Information', '', '', 'Date']
        ]
        const header = ['', 'Title', 'Author', 'Readings', '']
        const filterVal = ['id', 'title', 'author', 'pageviews', 'display_time']
        const list = data.list
        const result = formatJson(filterVal, list)
        const merges = ['A1:A2', 'B1:D1', 'E1:E2']
        excel.export_json_to_excel({
            multiHeader,
            header,
            merges,
            data: result
        })
        data.downloadLoading = false
    })
}

function formatJson(filterVal: string[], jsonData: any[]) {
    return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
            return parseTime(v[j])
        } else {
            return v[j]
        }
    }))
}

</script>
