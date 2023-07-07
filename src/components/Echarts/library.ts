// lib.ts
import * as echarts from "echarts/core";

import { BarChart, LineChart, PieChart, RadarChart } from "echarts/charts";
// 标签自动布局、全局过渡动画等特性
import { LabelLayout, UniversalTransition } from "echarts/features";
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from "echarts/renderers";
import {
  TooltipComponent,
  GridComponent,
  RadarComponent,
  TitleComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
  VisualMapComponent,
  DataZoomComponent,
} from "echarts/components";

import type {
  // 系列类型的定义后缀都为 SeriesOption
  BarSeriesOption,
  LineSeriesOption,
  PieSeriesOption,
} from "echarts/charts";
import type {
  // 组件类型的定义后缀都为 ComponentOption
  LegendComponentOption,
  TitleComponentOption,
  TooltipComponentOption,
  GridComponentOption,
  // 数据集组件
  DatasetComponentOption,
  // 内置数据转换器组件 (filter, sort)
} from "echarts/components";

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
export type EChartsOption = echarts.ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | TitleComponentOption
  | LegendComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
  | PieSeriesOption
>;

echarts.use([
  BarChart,
  LineChart,
  PieChart,
  RadarChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  RadarComponent,
  DatasetComponent,
  LegendComponent,
  LabelLayout,
  DataZoomComponent,
  UniversalTransition,
  TransformComponent,
  VisualMapComponent,
  CanvasRenderer,
]);

export default echarts;
