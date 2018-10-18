<template>
  <div class="orderlist">
    <div ref="critheader" style="padding:10px 20px">
      <el-card>
        <SelectBranch typeclass="all" @BranchChanged="branchChangedEvent"/>
        <!-- <el-button size="small" plain>今日</el-button>
        <el-button size="small" plain>昨日</el-button> -->
        <el-radio-group v-model="reporttype" size="small" @change="datechange">
          <el-radio-button label="今日" />
          <el-radio-button label="昨日" plain/>
          <el-radio-button label="本期" />
          <el-radio-button label="上期" />
          <el-radio-button label="本月" />
          <el-radio-button label="上月" />
          <el-radio-button label="选择日期" />
        </el-radio-group>
      </el-card>
    </div>
    <!-- <v-dialog v-show="showDialog" :dialog-option="dialogOption" ref="dialog"></v-dialog> -->
    <div :style="{height: myHeight}" style="padding:0 20px 10px 20px;">
      <div ref="tableheader" style="display:flex;flex-direction:column;padding:10px">
        <div style="width:100%;text-align:center;font-size:16px;color:#606266">营业报表</div>
        <div style="display:flex; font-size:14px;color:#606266">
          <!-- <div style="flex:1 1 auto">店名：{{ repdate }}</div> -->
          <div style="flex:1 1 auto; text-align:right"> 报表日期：{{ repdate }}</div>
        </div>
      </div>
      <el-table :data="orders" border size="small" height="100%">
        <el-table-column prop="reporder" label="序号" width="100"/>
        <el-table-column prop="billtype" label="项目"/>
        <el-table-column prop="amount" label="金额" style="text-align:right" width="200"/>
      </el-table>
    </div>
  </div>
</template>

<script>
import SelectBranch from '@/components/widgets/SelectBranch'
import { getCashReportData } from '@/api/finreport'

export default {
  name: 'CashReport',
  components: {
    SelectBranch
  },
  data() {
    return {
      selectedBranch: '',
      branches: [],
      orders: [],
      myHeight: '',
      reporttype: '昨日',
      repdate: '',
      showDialog: false,
      dialogOption: ''
    }
  },
  mounted() {
    // set content height
    const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight // 浏览器高度
    const critheaderheight = this.$refs.critheader.offsetHeight
    const tableheaderheight = this.$refs.tableheader.offsetHeight
    this.myHeight = (h - critheaderheight - tableheaderheight - 50) + 'px'
    var that = this
    window.onresize = function windowResize() {
      const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight // 浏览器高度
      that.myHeight = (h - critheaderheight - tableheaderheight - 50) + 'px'
    }
  },
  methods: {
    branchChangedEvent(event) {
      this.branchId = event.branchId
      this.retrieveData()
    },
    datechange: function(val) {
      console.log(val)
      if (val === '选择日期') {
        this.showDialog = true
      }
    },
    retrieveData() {
      var repdatefrom = '2017-12-14'
      var repdateto = '2017-12-14'
      this.repdate = repdatefrom + '到' + repdateto
      getCashReportData(this.branchId, repdatefrom, repdateto).then(response => {
        this.orders = response.data
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
.orderlist{display: flex; flex-direction: column;flex-flow: column;align-items: stretch;height:100%}
.el-card >>> .el-card__body {height:100%}
.el-card{height:100%}
.ordercontents {display:flex; padding:5px; font-size:14px}
.billtype {flex:1 1 200px}
.amount{flex:1 1 200px; text-align: right}
</style>
