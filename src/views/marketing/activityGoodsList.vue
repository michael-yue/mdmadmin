<template>
  <div class="activityGoodsList">
    <div ref="critheader" style="display:flex; justify-content: flex-end; margin:5px">
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
  name: 'ActivityGoodsList',
  data() {
    return {
      loading: false,
      myHeight: '',
      activityGoodsList: [],
      stauts: 0,
      name: ''
    }
  },
  watch: {
    status(newval, oldval) {
      this.listAllGoods()
    },
    name(newval, oldval) {
      this.listAllGoods()
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
  method: {
    listAllGoods() {
      listAllGoods(this.status, this.name).then(res => {
        this.activityList = res.data
      })
    }
  }
}
</script>
