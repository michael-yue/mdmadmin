<template>
  <div class="activityList">
    <div ref="critheader" style="display:flex; justify-content: flex-end; padding:5px">
      <el-button type="primary" size="small" @click="showCreate">新建</el-button>
    </div>
    <el-card :style="{height: myHeight}">
      <el-table :data="activityList" size="small" height="100%">
        <el-table-column prop="activityId" label="代码" width="150" header-align="center" align="left" />
        <el-table-column prop="name" label="名称" width="150" header-align="center" align="left" />
        <el-table-column prop="sumbmitDeadLine" label="截止日期" width="150" header-align="center" align="left" />
        <el-table-column prop="note" label="说明" header-align="center" align="left" />
        <el-table-column prop="status" label="状态" width="100" header-align="center" align="left" />
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { listAllActivities } from '@/api/marketing'
export default {
  name: 'ActivityList',
  data() {
    return {
      loading: false,
      myHeight: '',
      activityList: [],
      stauts: 0,
      name: '',
      dialogFormVisible: false
    }
  },
  mounted() {
    const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    const critheaderheight = this.$refs.critheader.offsetHeight
    this.myHeight = (h - critheaderheight - 50) + 'px'
    var that = this
    window.onresize = function windowResize() {
      const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
      that.myHeight = (h - critheaderheight - 50) + 'px'
    }
  },
  created() {
    this.listAllActivities()
  },
  methods: {
    listAllActivities() {
      listAllActivities(this.status, this.name).then(res => {
        this.activityList = res.data
      })
    },
    showCreate() {
      this.dialogFormVisible = true
    }
  }
}
</script>
