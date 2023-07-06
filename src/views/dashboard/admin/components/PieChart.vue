<template>
  <div ref="chartEl_pie" :class="className" :style="{ height: height, width: width }"></div>
</template>

<script setup lang="ts">
import { onMounted, Ref, ref, computed, nextTick } from "vue";
import type { EChartsOption } from "echarts";
import useChart, { RenderType, ThemeType } from "@/components/Echarts/useEchart";

const chartEl_pie = ref<HTMLDivElement | null>(null);
const { setOption, showLoading } = useChart(chartEl_pie as Ref<HTMLDivElement>, true, true,  ThemeType.Light);

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

const option = computed<EChartsOption>(() => ({
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b} : {c} ({d}%)",
  },
  legend: {
    left: "center",
    bottom: "10",
    data: ["Industries", "Technology", "Forex", "Gold", "Forecasts"],
  },
  series: [
    {
      name: "WEEKLY WRITE ARTICLES",
      type: "pie",
      roseType: "radius",
      radius: [15, 95],
      center: ["50%", "38%"],
      data: [
        { value: 320, name: "Industries" },
        { value: 240, name: "Technology" },
        { value: 149, name: "Forex" },
        { value: 100, name: "Gold" },
        { value: 59, name: "Forecasts" },
      ],
      animationEasing: "cubicInOut",
      animationDuration: 2600,
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
