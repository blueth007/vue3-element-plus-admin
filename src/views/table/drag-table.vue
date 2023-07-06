<template>
  <div class="app-container" v-if="list.length != 0">
    <!-- Note that row-key is necessary to get a correct row order. -->
    <el-table ref="dragTable" v-loading="listLoading" :data="list" row-key="id" border fit highlight-current-row
      style="width: 100%">
      <el-table-column align="center" label="ID" width="65">
        <template #default="{ row }">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="Date">
        <template #default="{ row }">
          <span>{{ parseTime(row.timestamp, '{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="300px" label="Title">
        <template #default="{ row }">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column width="110px" align="center" label="Author">
        <template #default="{ row }">
          <span>{{ row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" label="Importance">
        <template #default="{ row }">
          <span v-if="row.importance">
            <svg-icon v-for="n in  parseInt(row.importance)" :key="n" icon-class="star" class="icon-star" />
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Readings" width="95">
        <template #default="{ row }">
          <span>{{ row.pageviews }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" width="110">
        <template #default="{ row }">
          <el-tag :type="statusFilter(row.status)">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Drag" width="80">
        <template #default>
          <svg-icon class="drag-handler" icon-class="drag" />
        </template>
      </el-table-column>
    </el-table>
    <div class="show-d">
      <el-tag>The default order :</el-tag> {{ oldList }}
    </div>
    <div class="show-d">
      <el-tag>The after dragging order :</el-tag> {{ newList }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { fetchList } from '@/api/article'
import Sortable from 'sortablejs'
import { parseTime } from '@/utils/index'
import { nextTick, onMounted, reactive, ref, toRefs } from 'vue'
import type { TagProps } from 'element-plus'
const dragTable = ref()

const data = reactive({
  list: [],
  total: 0,
  listLoading: true,
  listQuery: {
    page: 1,
    limit: 10
  },
  sortable: null as Sortable | null,
  oldList: [] as string[],
  newList: [] as string[],
})

const { listLoading, list, oldList, newList } = toRefs(data)

onMounted(() => {
  getList()
})


async function getList() {
  data.listLoading = true
  const { data: result } = await fetchList(data.listQuery)
  // console.log("result:", result)
  data.list = result.items
  data.total = result.total
  data.listLoading = false
  data.oldList = data.list.map((v: any) => v.id)
  data.newList = data.oldList.slice()
  nextTick(() => {
    setSort()
  })
}

function setSort() {
  const el = dragTable.value?.$el.querySelectorAll('.el-table__body-wrapper table > tbody')[0]
  data.sortable = Sortable.create(el, {
    ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
    setData: function (dataTransfer) {
      // to avoid Firefox bug
      // Detail see : https://github.com/RubaXa/Sortable/issues/1012
      dataTransfer.setData('Text', '')
    },
    onEnd: evt => {
      const targetRow = data.list.splice(evt.oldIndex as number, 1)[0]
      data.list.splice(evt.newIndex as number, 0, targetRow)

      // for show the changes, you can delete in you code
      const tempIndex = data.newList.splice(evt.oldIndex as number, 1)[0]
      data.newList.splice(evt.newIndex as number, 0, tempIndex)
    }
  })
}

function statusFilter(status: string) {
  const statusMap: { [key: string]:  TagProps['type'] } = {
    published: 'success',
    draft: 'info',
    deleted: 'danger'
  }
  return statusMap[status]
}
</script>

<style scoped >
.sortable-ghost {
  opacity: .8;
  color: #fff !important;
  background: #42b983 !important;

}

.icon-star {
  margin-right: 2px;
}

.drag-handler {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.show-d {
  margin-top: 15px;
}
</style>
