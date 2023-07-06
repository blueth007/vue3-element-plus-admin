<template>
  <div ref="chartEl_bar" :class="className" :style="{ height: height, width: width }"></div>
</template>

<script setup lang="ts">
import { onMounted, Ref, ref, computed, nextTick } from "vue";
 
import useChart, { RenderType, ThemeType ,EChartsOption} from "@/components/Echarts/useEchart";

const chartEl_bar = ref<HTMLDivElement | null>(null);
const { setOption, showLoading } = useChart(chartEl_bar as Ref<HTMLDivElement>, true, true,   ThemeType.Light);

const props = defineProps({
  className: {
    type: String,
    default: "chart",
  },
  width: {
    type: String,
    default: "100%",
  },
  height: {
    type: String,
    default: "300px",
  },
});
const animationDuration = 3000;

const option = computed<EChartsOption>(() => ({
  tooltip: {
    trigger: "axis",
    axisPointer: {
      // 坐标轴指示器，坐标轴触发有效
      type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
    },
  },
  grid: {
    top: 10,
    left: "2%",
    right: "2%",
    bottom: "3%",
    containLabel: true,
  },
  xAxis: [
    {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      axisTick: {
        alignWithLabel: true,
      },
    },
  ],
  yAxis: [
    {
      type: "value",
      axisTick: {
        show: false,
      },
    },
  ],
  series: [
    {
      name: "pageA",
      type: "bar",
      stack: "vistors",
      barWidth: "60%",
      data: [79, 52, 200, 334, 390, 330, 220],
      animationDuration,
    },
    {
      name: "pageB",
      type: "bar",
      stack: "vistors",
      barWidth: "60%",
      data: [80, 52, 200, 334, 390, 330, 220],
      animationDuration,
    },
    {
      name: "pageC",
      type: "bar",
      stack: "vistors",
      barWidth: "60%",
      data: [30, 52, 200, 334, 390, 330, 220],
      animationDuration,
    },
  ],
}));

onMounted(() => {
  nextTick(() => {
    // 显示loading
    showLoading();
    // 假装有网络请求 ...
    // 渲染图表
    setOption(option.value);
  });
});
</script>
