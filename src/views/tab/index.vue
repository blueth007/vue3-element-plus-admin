<template>
  <div class="tab-container">
    <el-tag>mounted times ：{{ createdTimes }}</el-tag>
    <el-alert
      :closable="false"
      style="
        width: 200px;
        display: inline-block;
        vertical-align: middle;
        margin-left: 30px;
      "
      title="Tab with keep-alive"
      type="success"
    />
    <el-tabs v-model="activeName" style="margin-top: 15px" type="border-card">
      <el-tab-pane
        v-for="item in tabMapOptions"
        :key="item.key"
        :label="item.label"
        :name="item.key"
      >
        <keep-alive>
          <tab-pane
            v-if="activeName == item.key"
            :type="item.key"
            @create="showCreatedTimes"
          />
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import TabPane from "./components/TabPane.vue";
import { onBeforeMount, reactive, toRefs, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElTabs, ElTabPane, ElTag, ElAlert } from "element-plus";

const route = useRoute();
const router = useRouter();

const data = reactive({
  tabMapOptions: [
    { label: "China", key: "CN" },
    { label: "USA", key: "US" },
    { label: "Japan", key: "JP" },
    { label: "Eurozone", key: "EU" },
  ],
  activeName: "CN",
  createdTimes: 0,
});
const { createdTimes, activeName, tabMapOptions } = toRefs(data);
watch(
  () => data.activeName,
  (val) => {
    router.push(`${route.path}?tab=${val}`);
  }
);

onBeforeMount(() => {
  const tab = route.query.tab;
  if (tab) {
    data.activeName = tab as string;
  }
});

function showCreatedTimes() {
  data.createdTimes = data.createdTimes + 1;
}
</script>

<style scoped>
.tab-container {
  margin: 30px;
}
</style>
