import { nextTick, onMounted, onUnmounted, Ref, unref, isRef, onBeforeUnmount } from "vue";
 import echarts from "./library";
import type { EChartsOption } from "./library";
import { SVGRenderer, CanvasRenderer } from "echarts/renderers";
import { RenderType, ThemeType } from "./echarts-types";

export default function useChart(
  elRef: Ref<HTMLDivElement> | HTMLElement,
  autoChartSize = false,
  animation: boolean = false,
  render: RenderType = RenderType.SVGRenderer,
  theme: ThemeType = ThemeType.Default
) {
  // 渲染模式
  echarts.use(render === RenderType.SVGRenderer ? SVGRenderer : CanvasRenderer);
  // echart实例
  let chartInstance: echarts.ECharts | null = null;

  // 初始化echart
  const initCharts = () => {
    const el = unref(elRef);
    if (!el || !unref(el)) {
      return;
    }
    chartInstance = echarts.init(el, theme);
    
  };

  // 更新/设置配置
  const setOption = (option: EChartsOption) => {
    nextTick(() => {
      if (!chartInstance) {
        initCharts();
        if (!chartInstance) return;
      }

      chartInstance.setOption(option);
      hideLoading();
    });
  };

  // 获取echart实例
  function getInstance(): echarts.ECharts | null {
    if (!chartInstance) {
      initCharts();
    }
    return chartInstance;
  }

  // 更新大小
  function resize() {
    chartInstance?.resize();
  }

  // 监听元素大小
  function watchEl() {
    // 给元素添加过渡
    if (animation && isRef(elRef)) {
      (elRef as Ref<HTMLDivElement>).value.style.transition = "width 1s, height 1s";
    } else if (animation) {
      (elRef as HTMLElement).style.transition = "width 1s, height 1s";
    }
    const resizeObserver = new ResizeObserver((entries: any) => {
      return resize();
    });
    resizeObserver.observe(unref(elRef));
  }

  // 显示加载状
  function showLoading() {
    if (!chartInstance) {
      initCharts();
    }
    chartInstance?.showLoading();
  }
  // 显示加载状
  function hideLoading() {
    if (!chartInstance) {
      initCharts();
    }
    chartInstance?.hideLoading();
  }

  onMounted(() => {
    window.addEventListener("resize", resize);
    if (autoChartSize) watchEl();
  });

  onUnmounted(() => {
    window.removeEventListener("resize", resize);
  });
  onBeforeUnmount(() => {
    if (!chartInstance) {
      return;
    }
    chartInstance?.dispose();
    chartInstance = null;
  });

  return {
    setOption,
    getInstance,
    showLoading,
    hideLoading,
  };
}

export { RenderType, ThemeType, EChartsOption };
