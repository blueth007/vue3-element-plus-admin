<template>
  <el-scrollbar ref="scrollContainer" :vertical="false" class="scroll-container" @wheel.native.prevent="handleScroll">
    <slot></slot>
  </el-scrollbar>
</template>

<script lang="ts" setup>
//点击 tagsview 然后滚动到点击面板位置
import { computed, ref, watchEffect } from "vue";
import type { RouteItem } from "@/router";

const tagAndTagSpacing = 4; // tagAndTagSpacing
const scrollContainer = ref();

const props = defineProps(["link_tag"]);
const tagsList = ref<Array<any>>([]);

watchEffect(() => {
  tagsList.value = props.link_tag;
});

const scrollWrapper = computed(() => {
  return scrollContainer.value.wrapRef;
});

function handleScroll(e: any) {
  const eventDelta = e.wheelDelta || -e.deltaY * 40;
  const $scrollWrapper = scrollWrapper.value;
  $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4;
}
function moveToTarget(currentTag: any) {
  const $container = scrollContainer.value.$el;
  const $containerWidth = $container.offsetWidth;
  const $scrollWrapper = scrollWrapper.value;
  const tagList = tagsList.value; //childRef.value; //parent.$refs.tag;

  // console.log("move:", currentTag)
  let firstTag = null;
  let lastTag = null;

  // // find first tag and last tag
  if (tagList.length > 0) {
    firstTag = tagList[0];
    lastTag = tagList[tagList.length - 1];
  }

  if (firstTag === currentTag) {
    scrollContainer.value!.setScrollLeft(0);
  } else if (lastTag === currentTag) {
    scrollContainer.value!.setScrollLeft($scrollWrapper.scrollWidth - $containerWidth);
  } else {
    // find preTag and nextTag
    const currentIndex = tagList.findIndex((item: any) => item === currentTag);
    const prevTag = tagList[currentIndex - 1];
    const nextTag = tagList[currentIndex + 1];

    // the tag's offsetLeft after of nextTag
    const afterNextTagOffsetLeft = nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + tagAndTagSpacing;

    // the tag's offsetLeft before of prevTag
    const beforePrevTagOffsetLeft = prevTag.$el.offsetLeft - tagAndTagSpacing;

    if (afterNextTagOffsetLeft > $scrollWrapper.scrollLeft + $containerWidth) {
      scrollContainer.value!.setScrollLeft(afterNextTagOffsetLeft - $containerWidth);
    } else if (beforePrevTagOffsetLeft < $scrollWrapper.scrollLeft) {
      scrollContainer.value!.setScrollLeft(beforePrevTagOffsetLeft);
    }
  }
}
defineExpose({
  moveToTarget,
});
</script>
<style scoped lang="scss">
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;

  :deep(.el-scrollbar__bar) {
    bottom: 0px;
  }

  :deep(.e-scrollbar__wrap) {
    height: 49px;
    overflow-x: auto;
  }

  :deep(.el-scrollbar .el-scrollbar__wrap .el-scrollbar__view) {
    white-space: nowrap;
    display: inline-block;
  }
}

// .el-scrollbar .el-scrollbar__wrap .el-scrollbar__view {
//   white-space: nowrap;
//   display: inline-block;
// }
// .el-scrollbar__wrap{
//  overflow-x: auto;
//  height: calc(100% + 20px); //多出来的20px是横向滚动条默认的样式
// }
</style>
