<template>
    <div class="components-container">
        <aside>drag-list base on
            <a href="https://github.com/SortableJS/vue.draggable.next/blob/master/example/components/two-lists.vue"
                target="_blank">Vue.Draggable@next</a>
        </aside>
        <div class="editor-container">
            <dnd-list :list1="list1" :list2="list2" list1-title="List" list2-title="Article pool" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import DndList from '@/components/DndList/index.vue'
import { fetchList } from '@/api/article'
import { onMounted, ref } from 'vue';

const list1 = ref([]), list2 = ref([])

function getData() {
    // this.listLoading = true
    fetchList().then((response: any) => {
                list1.value = response.data.items.splice(0, 5)
        list2.value = response.data.items
    })
}

onMounted(() => {
    getData()
})
</script>

