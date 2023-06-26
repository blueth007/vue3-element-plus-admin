<template>
    <div class="dndList" v-if="list1.length !== 0 && list2.length !== 0">
        <div :style="{ width: width1 }" class="dndList-list">
            <h3>{{ list1Title }}</h3>
            <draggable :list="list1" group="article" @start="drag = true" @end="drag = false" itemKey="id" class="dragArea">
                <template #item="{ element }">
                    <div class="list-complete-item">
                        <div class="list-complete-item-handle">
                            {{ element.id }}[{{ element.author }}] {{ element.title }}
                        </div>
                        <div style="position:absolute;right:0px;">
                            <span style="float: right ;margin-top: -20px;margin-right:5px;" @click="deleteEle(element)">
                                <span class="iconify" data-icon="ep:delete" style="color: red;"></span>
                            </span>
                        </div>
                    </div>
                </template>
            </draggable>
        </div>
        <div :style="{ width: width2 }" class="dndList-list">
            <h3>{{ list2Title }}</h3>

            <draggable :list="list2" group="article" itemKey="id" @start="drag = true" @end="drag = false" class="dragArea">
                <template #item="{ element }">
                    <div class="list-complete-item">
                        <div class="list-complete-item-handle2" @click="pushEle(element)">
                            {{ element.id }} [{{ element.author }}] {{ element.title }}
                        </div>
                    </div>
                </template>
            </draggable>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import draggable from 'vuedraggable'

const props = defineProps({
    list1: {
        type: Array<any>,
        default: () => {
            return []
        }
    },
    list2: {
        type: Array<any>,
        default: () => {
            return []
        }
    },
    list1Title: {
        type: String,
        default: 'list1'
    },
    list2Title: {
        type: String,
        default: 'list2'
    },
    width1: {
        type: String,
        default: '48%'
    },
    width2: {
        type: String,
        default: '48%'
    }
})

const drag = ref(false)
function isNotInList1(v: any) {
    return props.list1.every((k: any) => v.id !== k.id)
}

function isNotInList2(v: any) {
    return props.list2.every((k: any) => v.id !== k.id)
}

function deleteEle(ele: any) {
    for (const item of props.list1) {
        if (item.id === ele.id) {
            const index = props.list1.indexOf(item)
            props.list1.splice(index, 1)
            break
        }
    }
    if (isNotInList2(ele)) {
        props.list2.unshift(ele)
    }
}

function pushEle(ele: any) {
    for (const item of props.list2) {
        if (item.id === ele.id) {
            const index = props.list2.indexOf(item)
            props.list2.splice(index, 1)
            break
        }
    }
    if (isNotInList1(ele)) {
        props.list1.push(ele)
    }
}

function setData(dataTransfer: any) {
    // to avoid Firefox bug
    // Detail see : https://github.com/RubaXa/Sortable/issues/1012
    dataTransfer.setData('Text', '')
}
</script>


<style lang="scss" scoped>
.dndList {
    background: #fff;
    padding-bottom: 40px;

    &:after {
        content: "";
        display: table;
        clear: both;
    }

    .dndList-list {
        float: left;
        padding-bottom: 30px;

        &:first-of-type {
            margin-right: 2%;
        }

        .dragArea {
            margin-top: 15px;
            min-height: 50px;
            padding-bottom: 30px;
        }
    }
}

.list-complete-item {
    cursor: pointer;
    position: relative;
    font-size: 14px;
    padding: 5px 12px;
    margin-top: 4px;
    border: 1px solid #bfcbd9;
    transition: all 1s;
}

.list-complete-item-handle {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-right: 50px;
}

.list-complete-item-handle2 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-right: 20px;
}

.list-complete-item.sortable-chosen {
    background: #4AB7BD;
}

.list-complete-item.sortable-ghost {
    background: #30B08F;
}

.list-complete-enter,
.list-complete-leave-active {
    opacity: 0;
}
</style>
