<template>
    <div :id="id" :class="className" :style="{ height: height, width: width }"></div>
</template>

<script setup lang="ts">
import { reactive, ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import * as echarts from 'echarts/core';
import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    VisualMapComponent,
    TooltipComponentOption,
    GridComponentOption,
} from 'echarts/components';
import { LineChart, LineSeriesOption, BarChart, BarSeriesOption } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
type EChartsOption = echarts.ComposeOption<
    | TooltipComponentOption
    | GridComponentOption
    | LineSeriesOption
    | BarSeriesOption
>;


echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    VisualMapComponent,
    BarChart,
    LineChart,
    CanvasRenderer,
    UniversalTransition
]);


const props = defineProps({
    className: {
        type: String,
        default: 'chart'
    },
    id: {
        type: String,
        default: 'chart' + new Date().getTime()
    },
    width: {
        type: String,
        default: '200px'
    },
    height: {
        type: String,
        default: '200px'
    }
})
const myChart = ref()

const data = reactive<any>({
    xAxisData: [],
    line_data: [],
    bar_data: [],

})
for (let i = 0; i < 50; i++) {
    data.xAxisData.push(i)
    data.line_data.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5)
    data.bar_data.push((Math.sin(i / 5) * (i / 5 + 10) + i / 6) * 3)
}

const option = computed<EChartsOption>(() => ({
    backgroundColor: '#08263a',
    grid: {
        left: '5%',
        right: '5%'
    },

    tooltip: {},
    xAxis: [{
        show: false,
        data: data.xAxisData,
        splitLine: {
            show: false
        }
    }, {
        show: false,
        data: data.xAxisData,
        splitLine: {
            show: false
        }
    }],
    visualMap: {
        show: false,
        min: 0,
        max: 50,
        dimension: 0,
        inRange: {
            color: ['#4a657a', '#308e92', '#b1cfa5', '#f5d69f', '#f5898b', '#ef5055']
        }
    },
    yAxis: {
        axisLine: {
            show: false
        },
        axisLabel: {
            color: '#4a657a'
        },
        splitLine: {
            show: true,
            lineStyle: {
                color: '#08263f'
            }
        },
        axisTick: {
            show: false
        }
    },
    series: [
        {
            name: 'bar',
            type: 'bar',
            data: data.bar_data,
            z: 1,
            itemStyle: {
                opacity: 0.4,
                borderRadius: 5,
                shadowBlur: 3,
                shadowColor: '#111'
            },
            animationDelay: function (idx: number) {
                return idx * 10;
            }
        },
        {
            name: 'Simulate Shadow',
            type: 'line',
            data: data.line_data,
            z: 2,
            showSymbol: false,
            animationDelay: 0,
            animationEasing: 'linear',
            animationDuration: 1200,
            lineStyle: {
                color: 'transparent'
            },
            areaStyle: {
                color: '#08263a',
                shadowBlur: 50,
                shadowColor: '#000'
            },

        },
        {
            name: 'front',
            type: 'bar',
            data: data.line_data,
            xAxisIndex: 1,
            z: 3,
            itemStyle: {
                borderRadius: 5
            },
            animationDelay: function (idx: number) {
                return idx * 10 + 100;
            }
        }
    ],
    animationEasing: 'elasticOut',
    animationDelayUpdate: function (idx: any) {
        return idx * 5;
    }
}))


onMounted(() => {
    initChart()
    window.addEventListener("resize", eResize);
})
onUnmounted(() => {
    if (!myChart) {
        return
    }
    // myChart.value?.dispose()
    myChart.value = null
    window.removeEventListener("resize", eResize);
})
function initChart() {
    var chartDom = document.getElementById(props.id);
    myChart.value = echarts.init(chartDom as HTMLElement);

    myChart.value.showLoading();
    nextTick(() => {
        myChart.value.hideLoading();
        myChart.value.setOption(option.value);
    })

}

//清空数据再次渲染
function eResize() {
    myChart.value?.clear();
    myChart.value?.resize()
    myChart.value?.setOption(option.value);
}

</script>

<style scoped lang="scss"></style>