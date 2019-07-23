<template>
  <div class="activityGoodsList">
    <div ref="critheader" class="">
      <MarketingActivitySelector />
      <el-button type="primary">新建</el-button>
    </div>
    <el-card :style="{height: myHeight}">
      <el-table :data="activityList" :header-cell-style="tableheader" border size="small" height="100%">
        <el-table-column prop="activityId" label="项目" width="150" header-align="center" align="left" />
        <el-table-column prop="name" label="名称" width="150" header-align="center" align="left" />
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { listAllGoods } from '@/api/marketing'
export default {
  name: 'activityGoodsList',
  data () {
    return {
      loading: false,
      activityGoodsList: [],
      stauts: 0,
      name: ''
    }
  },
  mounted() {
    const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    const critheaderheight = this.$refs.critheader.offsetHeight
    const reportheaderheight = this.$refs.reportheader.offsetHeight
    this.myHeight = (h - critheaderheight - reportheaderheight - 50) + 'px'
    var that = this
    window.onresize = function windowResize() {
      const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
      that.myHeight = (h - critheaderheight - reportheaderheight - 50) + 'px'
    }
  },
  watch: {
    status(newval, oldval) {
      this.listAllActivity()
    },
    name(newval, oldval) {
      this.listAllActivity()
    }
  },
  method: {
    listAllActivity () {
      listAllActivity(this.status, this.name).then(res => {
        this.activityList = res.data
      })
    }
  }
}
</script>

