<template>
  <div ref="chartEl_radar" :class="className" :style="{ height: height, width: width }"></div>
</template>

<script setup lang="ts">
import { onMounted, Ref, ref, computed, nextTick } from "vue";
import type { ECOption } from "@/components/Echarts/baseEcharts";
import useECharts, { echarts } from "@/components/Echarts/useEcharts";
import { LegendComponent, LegendComponentOption } from "echarts/components";
import { RadarChart, RadarSeriesOption } from 'echarts/charts';

echarts.use([RadarChart, LegendComponent])
type EChartsOption = echarts.ComposeOption<ECOption | RadarSeriesOption | LegendComponentOption>

const chartEl_radar = ref<HTMLDivElement | null>(null);
const { setOption, showLoading } = useECharts(chartEl_radar as Ref<HTMLDivElement>, true, true);

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
  //   xAxis: {
  //     alignTicks: : true,
  //   },
  //   yAxis: {
  //     alignTicks: true,
  //   },
  radar: {
    radius: "66%",
    center: ["50%", "42%"],
    splitNumber: 8,
    splitArea: {
      areaStyle: {
        color: ["rgba(127,95,132,0.3)"],
        opacity: 1,
        shadowBlur: 45,
        shadowColor: "rgba(0,0,0,.5)",
        shadowOffsetX: 0,
        shadowOffsetY: 15,
      },
    },
    indicator: [
      { name: "Sales" },
      { name: "Administration" },
      { name: "Information Technology" },
      { name: "Customer Support" },
      { name: "Development" },
      { name: "Marketing" },
    ],
  },
  legend: {
    left: "center",
    bottom: "10",
    data: ["Allocated Budget", "Expected Spending", "Actual Spending"],
  },
  series: [
    {
      type: "radar",
      symbolSize: 0,
      areaStyle: {
        shadowBlur: 13,
        shadowColor: "rgba(0,0,0,.2)",
        shadowOffsetX: 0,
        shadowOffsetY: 10,
        opacity: 1,
      },
      data: [
        {
          value: [5000, 7000, 12000, 11000, 15000, 14000],
          name: "Allocated Budget",
        },
        {
          value: [4000, 9000, 15000, 15000, 13000, 11000],
          name: "Expected Spending",
        },
        {
          value: [5500, 11000, 12000, 15000, 12000, 12000],
          name: "Actual Spending",
        },
      ],
      //   animationDuration: animationDuration,
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
