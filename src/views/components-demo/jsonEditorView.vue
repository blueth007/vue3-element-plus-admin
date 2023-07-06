<template>
  <div class="components-container">
    <aside>
      Json-Editor is base on
      <a href="https://github.com/codemirror" target="_blank">CodeMirrorr6</a>.
      Lint base on @codemirror/lang-json @codemirror/lang-javascript and
      JSON.stringify(str,null,2) .
    </aside>
    <div>
      <Codemirror v-model="value" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Codemirror from "@/components/JsonEditor/codemirror.vue";

const jsonData = [
  {
    items: [
      { market_type: "forexdata", symbol: "XAUUSD" },
      { market_type: "forexdata", symbol: "UKOIL" },
      { market_type: "forexdata", symbol: "CORN" },
    ],
    name: "轻工业",
  },
  {
    items: [
      { market_type: "forexdata", symbol: "XAUUSD" },
      { market_type: "forexdata", symbol: "XAGUSD" },
      { market_type: "forexdata", symbol: "AUTD" },
      { market_type: "forexdata", symbol: "AGTD" },
    ],
    name: "贵金属",
  },
  {
    items: [
      { market_type: "forexdata", symbol: "CORN" },
      { market_type: "forexdata", symbol: "WHEAT" },
      { market_type: "forexdata", symbol: "SOYBEAN" },
      { market_type: "forexdata", symbol: "SUGAR" },
    ],
    name: "农产品",
  },
  {
    items: [
      { market_type: "forexdata", symbol: "UKOIL" },
      { market_type: "forexdata", symbol: "USOIL" },
      { market_type: "forexdata", symbol: "NGAS", last: { isFinite: true } },
    ],
    name: "能源化工",
  },
];
const value = ref(JSON.stringify(jsonData, null, 2));
</script>

<style scoped></style>
