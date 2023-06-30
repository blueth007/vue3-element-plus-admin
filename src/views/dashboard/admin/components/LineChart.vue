<template>
  <div ref="chartEl_line" :class="className" :style="{ height: height, width: width }" />
</template>

<script lang="ts" setup>
import { onMounted, Ref, ref, computed, nextTick, watchEffect, watch } from "vue";
import type { EChartsOption } from "@/components/Echarts/useEchart";
import useChart, { RenderType, ThemeType } from "@/components/Echarts/useEchart";

const chartEl_line = ref<HTMLDivElement | null>(null);
const { setOption, showLoading } = useChart(chartEl_line as Ref<HTMLDivElement>, true, true, RenderType.CanvasRenderer, ThemeType.Light);

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
    default: "350px",
  },
  autoResize: {
    type: Boolean,
    default: true,
  },
  chartData: {
    type: Object as () => {
      expectedData: any;
      actualData: any;
    },
    required: true,
  },
});



const option = computed<EChartsOption>(() => ({
  // ...chart option

  xAxis: {
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    boundaryGap: false,
    axisTick: {
      show: false,
    },
  },
  grid: {
    left: 10,
    right: 10,
    bottom: 20,
    top: 30,
    containLabel: true,
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
    },
    padding: [5, 10],
  },
  yAxis: {
    axisTick: {
      show: false,
    },
  },
  legend: {
    data: ["expected", "actual"],
  },
  series: [
    {
      name: "expected",
      itemStyle: {
        color: "#FF005A",
      },
      lineStyle: {
        color: "#FF005A",
        width: 2,
      },
      smooth: true,
      type: "line",
      data: props.chartData.expectedData, // expectedData
      animationDuration: 2800,
      animationEasing: "cubicInOut",
    },
    {
      name: "actual",
      smooth: true,
      type: "line",
      itemStyle: {
        color: "#3888fa",
      },
      lineStyle: {
        color: "#3888fa",
        width: 2,
      },
      areaStyle: {
        color: "#f3f8ff",
      },
      data: props.chartData.actualData, // actualData,
      animationDuration: 2800,
      animationEasing: "quadraticOut",
    },
  ],
}));

watch(
  () => props.chartData,
  () => {
    nextTick(() => {
      // 显示loading
      showLoading();
      // 假装有网络请求 ...
      // 渲染图表
      setOption(option.value);
    });
  }
);
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
