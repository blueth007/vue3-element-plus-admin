<template>
  <span>
    {{ data.displayValue }}
  </span>
</template>
<script lang="ts" setup>
import { requestAnimationFrame, cancelAnimationFrame } from "./requestAnimationFrame";
import { computed, onMounted, onUnmounted, reactive, watch } from "vue";


const props = defineProps({
  startVal: {
    type: Number,
    required: false,
    default: 0,
  },
  endVal: {
    type: Number,
    required: false,
    default: 2017,
  },
  duration: {
    type: Number,
    required: false,
    default: 3000,
  },
  autoplay: {
    type: Boolean,
    required: false,
    default: true,
  },
  decimals: {
    type: Number,
    required: false,
    default: 0,
    validator: (value: number) => {
      return value >= 0;
    },
  },
  decimal: {
    type: String,
    required: false,
    default: ".",
  },
  separator: {
    type: String,
    required: false,
    default: ",",
  },
  prefix: {
    type: String,
    required: false,
    default: "",
  },
  suffix: {
    type: String,
    required: false,
    default: "",
  },
  useEasing: {
    type: Boolean,
    required: false,
    default: true,
  },
  easingFn: {
    type: Function,
    default: (t: number, b: number, c: number, d: number) => {
      return (c * (-Math.pow(2, (-10 * t) / d) + 1) * 1024) / 1023 + b;
    },
  },
});

const emit = defineEmits(["mountedCallback", "callback"]);

const data = reactive({
  localStartVal: props.startVal,
  displayValue: formatNumber(props.startVal),
  printVal: 0,
  paused: false,
  localDuration: props.duration,
  startTime: null,
  timestamp: null,
  remaining: 0,
  rAF: null,
});

const countDown = computed(() => {
  return props.startVal > props.endVal;
});

watch(
  () => props.startVal,
  () => {
    if (props.autoplay) {
      start();
    }
  }
);

watch(
  () => props.endVal,
  () => {
    if (props.autoplay) {
      start();
    }
  }
);

onMounted(() => {
  if (props.autoplay) {
    start();
  }
  emit("mountedCallback");
});

onUnmounted(() => {
  cancelAnimationFrame(data.rAF);
});

function start() {
  data.localStartVal = props.startVal;
  data.startTime = null;
  data.localDuration = props.duration;
  data.paused = false;
  data.rAF = requestAnimationFrame(count);
}

function formatNumber(num: number) {
  let num_str = num.toFixed(props.decimals);

  const x = num_str.split(".");
  let x1 = x[0];
  const x2 = x.length > 1 ? props.decimal + x[1] : "";
  const rgx = /(\d+)(\d{3})/;
  if (props.separator && !isNumber(props.separator)) {
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, "$1" + props.separator + "$2");
    }
  }
  return props.prefix + x1 + x2 + props.suffix;
}

function pauseResume() {
  if (data.paused) {
    resume();
    data.paused = false;
  } else {
    pause();
    data.paused = true;
  }
}

function pause() {
  cancelAnimationFrame(data.rAF);
}

function resume() {
  data.startTime = null;
  data.localDuration = +data.remaining;
  data.localStartVal = +data.printVal;
  requestAnimationFrame(count);
}

function reset() {
  data.startTime = null;

  data.displayValue = formatNumber(props.startVal);
}

function count(timestamp: any) {
  let progress: number = 0;
  if (!data.startTime) {
    data.startTime = timestamp;
  } else {
    data.timestamp = timestamp;
    progress = timestamp - data.startTime;
  }
  data.remaining = data.localDuration - progress;

  if (props.useEasing) {
    if (countDown.value) {
      data.printVal = data.localStartVal - props.easingFn(progress, 0, data.localStartVal - props.endVal, data.localDuration);
    } else {
      data.printVal = props.easingFn(progress, data.localStartVal, props.endVal - data.localStartVal, data.localDuration);
    }
  } else {
    if (countDown.value) {
      data.printVal = data.localStartVal - (data.localStartVal - props.endVal) * (progress / data.localDuration);
    } else {
      data.printVal = data.localStartVal + (props.endVal - data.localStartVal) * (progress / data.localDuration);
    }
  }
  if (countDown.value) {
    data.printVal = data.printVal < props.endVal ? props.endVal : data.printVal;
  } else {
    data.printVal = data.printVal > props.endVal ? props.endVal : data.printVal;
  }

  data.displayValue = formatNumber(data.printVal);
  if (progress < data.localDuration) {
    data.rAF = requestAnimationFrame(count);
  } else {
    emit("callback");
  }
}

function isNumber(val: any) {
  return !isNaN(parseFloat(val));
}
defineExpose({
  start,
  pauseResume
})

</script>
