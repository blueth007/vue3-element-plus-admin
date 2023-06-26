<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">
        <el-col :span="6" :xs="24">
          <user-card :user="user" />
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="Activity" name="activity">
                <activity />
              </el-tab-pane>
              <el-tab-pane label="Timeline" name="timeline">
                <timeline />
              </el-tab-pane>
              <el-tab-pane label="Account" name="account">
                <account :user="user" />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from '@/store';

import UserCard from "./components/UserCard.vue";
import Activity from "./components/Activity.vue";
import Timeline from "./components/Timeline.vue";
import Account from "./components/Account.vue";

const store = useStore();

const user = ref<{ name: string, role: string, email: string, avatar: string }>({
  name: store.name,
  role: store.roles.join(' | '),
  email: "admin@test.com",
  avatar: store.avatar
});
const activeTab = ref<string>("activity");


</script>
