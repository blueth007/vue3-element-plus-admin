<template>
  <div class="navbar">
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container"
      @toggleClick="toggleSideBar" />
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    <div class="right-menu">
      <template v-if="device !== 'mobile'">
        <header-search id="header-search" class="right-menu-item" />
        <error-log class="errLog-container right-menu-item hover-effect" />
        <screenfull id="screenfull" class="right-menu-item hover-effect" />
        <el-tooltip content="Global Size" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip>

      </template>
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar + '?imageView2/1/w/80/h/80'" class="user-avatar">
          {{ userName }}
          <el-icon>
            <span class="iconify el-icon-caret-bottom" data-icon="ep:caret-bottom" data-inline="true"></span>
          </el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <router-link to="/profile/index">
              <el-dropdown-item>Profile</el-dropdown-item>
            </router-link>
            <router-link to="/">
              <el-dropdown-item>Dashboard</el-dropdown-item>
            </router-link>
            <a target="_blank" href="https://github.com/PanJiaChen/vue-element-admin/">
              <el-dropdown-item>Github</el-dropdown-item>
            </a>
            <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
              <el-dropdown-item>Docs</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click.native="logout">
              <span style="display:block;">Log Out</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watchEffect } from "vue";
import { useStore } from "@/store";
import { useRouter, useRoute } from "vue-router";
import { storeToRefs } from "pinia";

const $router = useRouter()
const $route = useRoute()
const store = useStore();

const { sidebar } = storeToRefs(store)

const device = computed(() => store.device)
const avatar = computed(() => store.avatar)
const userName = computed(() => store.name)


const toggleSideBar = () => {
  store.app.toggleSideBar()
}
const logout = async () => {
  //  await this.$store.dispatch('user/logout')
  await store.user.logout();
  $router.push(`/login?redirect=${$route.fullPath}`);
};
</script>
<style lang="scss" scoped>
.el-breadcrumb {
  height: 100%;
  line-height: 50px;
}


.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  #header-search {
    display: inline-flex;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      line-height: 50px;
      font-size: 18px;
      color: #5a5e66;
      // vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      padding-right: 30px;

      .avatar-wrapper {
        // margin-top: 5px;
        position: relative;

        img {
          display: inline-block;
        }

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: 0px;
          top: 20px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
