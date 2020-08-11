<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
    <breadcrumb v-if="device === 'desktop'" />
    <div class="avatar-container">
      <!-- <el-button v-if="device === 'desktop'" size="mini" style="margin-right:10px" @click="toggle">
        <svg-icon :icon-class="isFullscreen?'exit-fullscreen':'fullscreen'" />
      </el-button> -->
      <div v-if="device === 'desktop'" class="screen" @click="toggle">
        <svg-icon :icon-class="isFullscreen?'exit-fullscreen':'fullscreen'" />
      </div>
      <el-dropdown trigger="click">
        <div class="avatar-wrapper">
          <!-- <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar"> -->
          <div>{{ name }}</div>
          <i class="el-icon-caret-bottom"/>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link class="inlineBlock" to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">注销</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      name: 'navbar',
      isFullscreen: false
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ]),
    device() {
      return this.$store.state.app.device
    }
  },
  created: function() {
    this.name = store.getters.name
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
    toggle: function() {
      if (this.fullscreen) { // 退出全屏
        var de1 = document
        if (de1.exitFullscreen) {
          de1.exitFullscreen()
        } else if (de1.mozCancelFullScreen) {
          de1.mozCancelFullScreen()
        } else if (de1.webkitCancelFullScreen) {
          de1.webkitCancelFullScreen()
        }
        this.fullscreen = false
      } else { // 进入全屏
        var de = document.documentElement
        if (de.requestFullscreen) {
          de.requestFullscreen()
        } else if (de.mozRequestFullScreen) {
          de.mozRequestFullScreen()
        } else if (de.webkitRequestFullScreen) {
          de.webkitRequestFullScreen()
        }
        this.fullscreen = true
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    float: right;
    height: 100%;
    line-height: 50px;
    margin-right: 10px; //add
    &:focus {
      outline: none;
    }
    .user-dropdown {
      margin-right:20px;
    }
    .item {
      margin-right:10px;
      padding:0 5px;
      display:inline-block;
      .el-badge__content.is-fixed {
        top: 8px;
      }
    }
    .screen {
      margin-right:10px;display:inline-block;
      cursor: pointer;
    }
    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;
      cursor: pointer;
    }
    .avatar-wrapper {
      cursor: pointer;
      margin: 0px 20px 0 0;
      // color:#f3f3f3; // theme
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 20px;
        font-size: 12px;
        margin:auto
      }
    }
  }
}
</style>
