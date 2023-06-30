<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="Title" style="width: 200px;" class="filter-item"
        @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.importance" placeholder="Imp" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.type" placeholder="Type" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name + '(' + item.key + ')'"
          :value="item.key" />
      </el-select>
      <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" @click="handleFilter">
        <span class="iconify el-icon" data-icon="ep:search"></span>
        <span>Search</span>
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" @click="handleCreate">
        <span class="iconify el-icon" data-icon="ep:edit"></span>
        <span>Add</span>
      </el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" @click="handleDownload">
        <span class="iconify el-icon" data-icon="ep:download"></span>
        <span>Export</span>
      </el-button>
      <el-checkbox v-model="showReviewer" class="filter-item" style="margin-left:15px;" @change="tableKey = tableKey + 1">
        reviewer
      </el-checkbox>
    </div>

    <el-table :key="tableKey" v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%;"
      @sort-change="sortChange">
      <el-table-column label="ID" prop="id" sortable="custom" align="center" width="80" :class-name="getSortClass('id')">
        <template #default="{ row }">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Date" width="150px" align="center">
        <template #default="{ row }">
          <span>{{ parseTime(row.timestamp, '{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Title" min-width="150px">
        <template #default="{ row }">
          <span class="link-type" @click="handleUpdate(row)">{{ row.title }}</span>
          <el-tag>{{ typeFilter(row.type) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Author" width="110px" align="center">
        <template #default="{ row }">
          <span>{{ row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="showReviewer" label="Reviewer" width="110px" align="center">
        <template #default="{ row }">
          <span style="color:red;">{{ row.reviewer }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Imp" width="80px">
        <template #default="{ row }">
          <span v-if="row.importance">
            <svg-icon v-for="n in row.importance" :key="n" icon-class="star" class="meta-item__icon" />
          </span>
        </template>
      </el-table-column>
      <el-table-column label="Readings" align="center" width="95">
        <template #default="{ row }">
          <span v-if="row.pageviews" class="link-type" @click="handleFetchPv(row.pageviews)">{{ row.pageviews }}</span>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <el-table-column label="Status" class-name="status-col" width="100">
        <template #default="{ row }">
          <el-tag :type="statusFilter(row.status)">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center" width="230" class-name="small-padding fixed-width">
        <template #default="{ row, $index }">
          <el-button type="primary" size="small" @click="handleUpdate(row)">
            Edit
          </el-button>
          <el-button v-if="row.status != 'published'" size="small" type="success"
            @click="handleModifyStatus(row, 'published')">
            Publish
          </el-button>
          <el-button v-if="row.status != 'draft'" size="small" @click="handleModifyStatus(row, 'draft')">
            Draft
          </el-button>
          <el-button v-if="row.status != 'deleted'" size="small" type="danger" @click="handleDelete(row, $index)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" v-model:total="total" v-model:page="listQuery.page" v-model:limit="listQuery.limit"
      @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" v-model="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px"
        style="width: 400px; margin-left:50px;">
        <el-form-item label="Type" prop="type">
          <el-select v-model="temp.type" class="filter-item" placeholder="Please select">
            <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="Date" prop="timestamp">
          <el-date-picker v-model="temp.timestamp" type="datetime" placeholder="Please pick a date" />
        </el-form-item>
        <el-form-item label="Title" prop="title">
          <el-input v-model="temp.title" />
        </el-form-item>
        <el-form-item label="Status">
          <el-select v-model="temp.status" class="filter-item" placeholder="Please select">
            <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="Imp">
          <el-rate v-model="temp.importance" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :max="3"
            style="margin-top:8px;" />
        </el-form-item>
        <el-form-item label="Remark">
          <el-input v-model="temp.remark" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea"
            placeholder="Please input" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="dialogStatus === 'create' ? createData() : updateData()">
          Confirm
        </el-button>
      </div>
    </el-dialog>

    <el-dialog v-model="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script setup lang="ts">
import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
import vWaves from '@/directive/waves/index' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination/index.vue' // secondary package based on el-pagination
import { ElNotification } from 'element-plus'
import { onMounted, nextTick, reactive, toRefs, ref, onBeforeMount } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'

const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc: any, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})


const data = reactive({
  tableKey: 0,
  list: [] as Array<any>,
  total: 0,
  listLoading: true,
  listQuery: {
    page: 1,
    limit: 20,
    importance: undefined,
    title: undefined,
    type: undefined,
    sort: '+id'
  },
  importanceOptions: [1, 2, 3],
  //  calendarTypeOptions,
  sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
  statusOptions: ['published', 'draft', 'deleted'],
  showReviewer: false,
  temp: {
    id: 0,
    importance: 1,
    remark: '',
    timestamp: new Date() as Date | number,
    title: '',
    type: '',
    status: 'published',
    author: ""
  },
  dialogFormVisible: false,
  dialogStatus: '',
  textMap: {
    update: 'Edit',
    create: 'Create'
  } as { [key: string]: string },
  dialogPvVisible: false,
  pvData: [],
  rules: {
    type: [{ required: true, message: 'type is required', trigger: 'change' }],
    timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
    title: [{ required: true, message: 'title is required', trigger: 'blur' }]
  },
  downloadLoading: false
})
const { dialogPvVisible, importanceOptions, showReviewer, total, textMap, dialogFormVisible, rules, temp, dialogStatus,
  listQuery, listLoading, list, statusOptions, pvData, tableKey, sortOptions,
  downloadLoading } = toRefs(data)

const dataForm = ref<FormInstance>()
onBeforeMount(() => {
  getList()
})

const statusFilter = (status: string) => {
  const statusMap: { [key: string]: string } = {
    published: 'success',
    draft: 'info',
    deleted: 'danger'
  }
  return statusMap[status]
}
function typeFilter(type: string) {
  return calendarTypeKeyValue[type]
}

function getList() {
  data.listLoading = true
  fetchList(data.listQuery).then(response => {
    data.list = response.data.items
    data.total = response.data.total

    // Just to simulate the time of the request
    setTimeout(() => {
      data.listLoading = false
    }, 1.5 * 1000)
  })
}

function handleFilter() {
  data.listQuery.page = 1
  getList()
}

function handleModifyStatus(row: any, status: string) {

  ElMessage({
    message: '操作Success',
    type: 'success'
  })
  row.status = status
}

function sortChange(data: any) {
  const { prop, order } = data
  if (prop === 'id') {
    sortByID(order)
  }
}

function sortByID(order: string) {
  if (order === 'ascending') {
    data.listQuery.sort = '+id'
  } else {
    data.listQuery.sort = '-id'
  }
  handleFilter()
}

function resetTemp() {
  data.temp = {
    id: 0,
    importance: 1,
    remark: '',
    timestamp: new Date(),
    title: '',
    status: 'published',
    type: '',
    author: ""
  }
}

function handleCreate() {
  resetTemp()
  data.dialogStatus = 'create'
  data.dialogFormVisible = true
  nextTick(() => {
    /* Warn: Cannot find refs name */
    dataForm.value?.clearValidate()
  })
}

function createData() {
  /* Warn: Cannot find refs name */
  dataForm.value?.validate((valid: any) => {
    if (valid) {
      data.temp.id = Math.floor(Math.random() * 100) + 1024 // mock a id
      data.temp.author = 'vue-element-admin'//当前用户名
      createArticle(data.temp).then(() => {
        data.list.unshift(data.temp)
        data.dialogFormVisible = false

        ElNotification({
          title: 'Success',
          message: 'Created Successfully',
          type: 'success',
          duration: 2000
        })
      })
    }
  })
}

function handleUpdate(row: any) {
  data.temp = Object.assign({}, row) // copy obj
  data.temp.timestamp = new Date(data.temp.timestamp)
  data.dialogStatus = 'update'
  data.dialogFormVisible = true
  nextTick(() => {
    dataForm.value?.clearValidate()
  })
}

function updateData() {

  dataForm.value?.validate((valid: any) => {
    if (valid) {
      const tempData = Object.assign({}, data.temp)
      tempData.timestamp = new Date(tempData.timestamp).getTime()  // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
      updateArticle(tempData).then(() => {
        const index = data.list.findIndex(v => v.id === data.temp.id)
        data.list.splice(index, 1, data.temp)
        data.dialogFormVisible = false

        ElNotification({
          title: 'Success',
          message: 'Update Successfully',
          type: 'success',
          duration: 2000
        })
      })
    }
  })
}

function handleDelete(row: any, index: number) {

  ElNotification({
    title: 'Success',
    message: 'Delete Successfully',
    type: 'success',
    duration: 2000
  })
  data.list?.splice(index, 1)
}

function handleFetchPv(pv: any) {
  fetchPv(pv).then(response => {
    data.pvData = response.data.pvData
    data.dialogPvVisible = true
  })
}

function handleDownload() {
  data.downloadLoading = true
  import('@/vendor/Export2Excel').then(excel => {
    const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
    const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
    const result = formatJson(filterVal)
    excel.export_json_to_excel({
      header: tHeader,
      data: result,
      filename: 'table-list'
    })
    data.downloadLoading = false
  })

}

function formatJson(filterVal: string[]) {
  return data.list?.map(v => filterVal.map((j: string) => {
    if (j === 'timestamp') {
      return parseTime(v[j])
    } else {
      return v[j]
    }
  }))
}

function getSortClass(key: string) {
  const sort = data.listQuery.sort
  return sort === `+${key}` ? 'ascending' : 'descending'
}
</script>
<style scoped lang="scss">
.fixed-width {
  .el-button--mini {
    padding: 7px 10px;
    width: 60px;
  }
}

//解决el-button按钮点击后不失去焦点 不变颜色问题
.el-button--primary {
  --el-button-bg-color: #409eff;
  --el-button-hover-bg-color: #409eff;
}

.el-button--primary:hover {
  --el-button-hover-bg-color: #79bbff;
}
</style>