<template>
  <div wrap-class="scrollbar-wrapper">
    <div style="height:50px;background-color:rgb(48, 65, 86);padding:10px 40px;">
      <img src="@/assets/mdm_logo.png" width="100%" >
    </div>
    <el-scrollbar>
      <el-menu
        :show-timeout="200"
        :default-active="$route.path"
        :collapse="isCollapse"
        mode="vertical"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
      >
        <sidebar-item v-for="route in permission_routers" :key="route.name" :item="route" :base-path="route.path"/>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    // routes() {
    //   return this.$router.options.routes
    // },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>

<style scoped>
.el-scrollbar{height:100%}
.el-scrollbar >>> .el-scrollbar__wrap{height:100%}
.el-scrollbar >>> .el-scrollbar__view{height:100%}
</style>
