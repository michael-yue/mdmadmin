<template>
  <div class="orderlist">
    <div ref="critheader" style="padding:10px 20px">
      <el-card>
        <SelectBranch typeclass="all" @BranchChanged="branchChangedEvent"/>
        <el-radio-group v-model="reporttype" size="small">
          <el-radio-button label="今日" />
          <el-radio-button label="昨日" />
          <el-radio-button label="本期" />
          <el-radio-button label="上期" />
          <el-radio-button label="本月" />
          <el-radio-button label="上月" />
          <el-radio-button label="选择日期" />
        </el-radio-group>
      </el-card>
    </div>
    <div :style="{height: myHeight}" style="padding:0 20px 10px 20px;">
      <!-- <el-card>
      </el-card> -->
    </div>
  </div>
</template>

<script>
import SelectBranch from '@/components/widgets/SelectBranch'
export default {
  name: 'SalesReport',
  components: {
    SelectBranch
  },
  data() {
    return {
      selectedBranch: '',
      orders: [],
      myHeight: '',
      reporttype: '昨日'
    }
  },
  mounted() {
    const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight // 浏览器高度
    const critheaderheight = this.$refs.critheader.offsetHeight
    this.myHeight = (h - critheaderheight - 50) + 'px'
    var that = this
    window.onresize = function windowResize() {
      const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight // 浏览器高度
      that.myHeight = (h - critheaderheight - 50) + 'px'
    }
  }
}
</script>
<style scoped>
/* .orderlist{display: flex; flex-direction: column;flex-flow: column;align-items: stretch;height:100%} */
.el-card >>> .el-card__body {height:100%}
.el-card{height:100%}
</style>
