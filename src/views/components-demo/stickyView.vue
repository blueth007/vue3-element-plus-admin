<template>
  <div>
    <sticky :z-index="10" class-name="sub-navbar">
      <el-dropdown trigger="click">
        <el-button plain>
          Platform<i class="el-icon-caret-bottom el-icon--right" />
        </el-button>
        <template #dropdown>
          <el-dropdown-menu class="no-border">
            <el-checkbox-group v-model="platforms" style="padding: 5px 15px">
              <el-checkbox
                v-for="item in platformsOptions"
                :key="item.key"
                :label="item.key"
              >
                {{ item.name }}
              </el-checkbox>
            </el-checkbox-group>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <el-dropdown trigger="click">
        <el-button plain>
          Link<i class="el-icon-caret-bottom el-icon--right" />
        </el-button>
        <template #dropdown>
          <el-dropdown-menu class="no-padding no-border" style="width: 300px">
            <el-input v-model="url" placeholder="Please enter the content">
              <template slot="prepend"> Url </template>
            </el-input>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <div class="time-container">
        <el-date-picker
          v-model="time"
          type="datetime"
          format="yyyy-MM-dd HH:mm:ss"
          placeholder="Release time"
        />
      </div>

      <el-button style="margin-left: 10px" type="success"> publish </el-button>
    </sticky>

    <div class="components-container">
      <aside>
        Sticky header, When the page is scrolled to the preset position will be
        sticky on the top.
      </aside>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <sticky :sticky-top="200">
        <el-button type="primary"> placeholder</el-button>
      </sticky>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs } from "vue";
import {
  ElButton,
  ElDropdown,
  ElDropdownMenu,
 
  ElCheckboxGroup,
  ElCheckbox,
  ElInput,
  ElDatePicker,
} from "element-plus";
import Sticky from "@/components/Sticky/index.vue";

const data = reactive({
  time: "",
  url: "",
  platforms: ["a-platform"],
  platformsOptions: [
    { key: "a-platform", name: "platformA" },
    { key: "b-platform", name: "platformB" },
    { key: "c-platform", name: "platformC" },
  ],
  pickerOptions: {
    disabledDate(time: Date) {
      return time.getTime() > Date.now();
    },
  },
});
const { time, url, platforms, platformsOptions } = toRefs(data);
</script>

<style scoped lang="scss">
.el-dropdown,
.components-container div {
  margin: 10px;
}

.time-container {
  display: inline-block;
}
</style>
