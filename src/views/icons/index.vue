<template>
  <div class="icons-container">
    <aside>
      <a
        href="https://panjiachen.github.io/vue-element-admin-site/guide/advanced/icon.html"
        target="_blank"
        >Add and use
      </a>
      <p>
        element-plus icons has been improved svg-icons for
        vue3。element-plus更换字体图标为svg图。直接从iconify获取并添加el-icon类来使图标样式匹配
      </p>
      <p>
        <a href="https://fontawesome.com/v5/search" target="_blank"
          >fontawesome</a
        >字体图标使用的是5.15.4.根据 i的class=" fas/far/fab xxx" 来从类实心(fas)
        常规(far) 品牌(fab)获取图标
      </p>
    </aside>
    <el-tabs type="border-card">
      <el-tab-pane label="Icons">
        <div class="grid">
          <div
            v-for="item in svgIcons"
            :key="item"
            @click="handleClipboard(generateIconCode(item), $event)"
          >
            <el-tooltip placement="top">
              <template #content>
                <div>
                  {{ generateIconCode(item) }}
                </div>
              </template>
              <div class="icon-item">
                <svg-icon :icon-class="item" class-name="disabled"></svg-icon>
                <span>{{ item }}</span>
              </div>
            </el-tooltip>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Element-Plus Icons">
        <div v-for="(icons, index) in elementPlusIcons" :key="icons + index">
          <h3>{{ index }}</h3>
          <div class="grid">
            <div
              v-for="(item, idx) in icons"
              :key="item + idx"
              @click="handleClipboard(generateElementIconCode(item), $event)"
            >
              <el-tooltip placement="top">
                <template #content>
                  <div>
                    {{ generateElementIconCode(item) }}
                  </div>
                </template>
                <div class="icon-item">
                  <span
                    class="iconify el-icon"
                    :data-icon="'ep:' + item"
                  ></span>
                  <span>{{ item }}</span>
                </div>
              </el-tooltip>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="awesomeFont Icons">
        <div class="grid">
          <div
            v-for="item in aweSome"
            :key="item"
            @click="handleClipboard(generateAwesomeIConCode(item), $event)"
          >
            <el-tooltip placement="top">
              <template #content>
                <div>
                  {{ generateAwesomeIConCode(item) }}
                </div>
              </template>
              <div class="icon-item">
                <i :class="'fab fa-' + item"></i>
                <span>{{ item }}</span>
              </div>
            </el-tooltip>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import "@/icons/awesomeFont/css/all.min.css";
import clipboard from "@/utils/clipboard";
import svgIcons from "./svg-icons";
import elementPlusIcons from "./element-icons";
import aweSome from "./aweSome-icons";
import { ElTabs, ElTabPane, ElTooltip } from "element-plus";
import SvgIcon from "@/components/SvgIcon/index.vue";

function generateIconCode(symbol: any) {
  return `<svg-icon icon-class="${symbol}" />`;
}

function generateElementIconCode(symbol: any) {
  // return `<i class="el-icon-${symbol}" />`
  return `<span class="iconify el-icon" data-icon="ep:${symbol}" />`;
}

function generateAwesomeIConCode(symbol: any) {
  // return `<i class="el-icon-${symbol}" />`
  return `<i class="fab fa-${symbol}"></i>`;
}
function handleClipboard(text: any, event: any) {
  clipboard(text, event);
}
</script>

<style lang="scss" scoped>
.icons-container {
  margin: 10px 20px 0;
  overflow: hidden;

  .grid {
    position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }

  .icon-item {
    margin: 20px;
    height: 85px;
    text-align: center;
    width: 100px;
    float: left;
    font-size: 30px;
    color: #24292e;
    cursor: pointer;
  }

  span {
    display: block;
    font-size: 16px;
    margin-top: 10px;
  }

  .disabled {
    pointer-events: none;
  }
}
</style>
