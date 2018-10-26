<template>
  <div class="orderlist">
    <div ref="critheader" style="padding:10px 20px">
      <el-card>
        <SelectBranch typeclass="all" @BranchChanged="branchChangedEvent"/>
        <el-date-picker
          v-model="dateRange"
          :default-time="['00:00:00', '23:59:59']"
          type="daterange"
          size="small"
          start-placeholder="开始日期"
          end-placeholder="结束日期" />
      </el-card>
    </div>
    <div :style="{height: myHeight}" style="padding:0 20px 10px 20px;">
      <div ref="tableheader" style="display:flex;flex-direction:column;padding:10px">
        <div style="width:100%;text-align:center;font-size:16px;color:#606266">营业报表</div>
        <div style="display:flex; font-size:14px;color:#606266">
          <div style="flex:1 1 auto; text-align:right"> 报表日期：{{ repdate }}</div>
        </div>
      </div>
      <el-table :data="orders" border size="small" height="100%">
        <el-table-column prop="reporder" label="序号" width="100"/>
        <el-table-column prop="billtype" label="项目"/>
        <el-table-column prop="amount" label="金额" width="200" align="right"/>
      </el-table>
    </div>
  </div>
</template>

<script>
import SelectBranch from '@/components/widgets/SelectBranch'
import { getCashReportData } from '@/api/finreport'
import { parseTime, getYesterday, getThisPeriodStart, getThisPeriodEnd,
  getLastPeriodStart, getLastPeriodEnd, getThisMonthStart, getThisMonthEnd,
  getLastMonthStart, getLastMonthEnd } from '@/utils'
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
      reporttype: '',
      repdate: '',
      dateRange: []
    }
  },
  watch: {
    dateRange: function(val, oldval) {
      this.retrieveData()
    },
    reporttype: function(val, oldval) {
      this.dateRange = []
      if (val === '昨日') {
        this.dateRange.push(getYesterday())
        this.dateRange.push(getYesterday())
      } else if (val === '本期') {
        this.dateRange.push(getThisPeriodStart())
        this.dateRange.push(getThisPeriodEnd())
      } else if (val === '上期') {
        this.dateRange.push(getLastPeriodStart())
        this.dateRange.push(getLastPeriodEnd())
      } else if (val === '本月') {
        this.dateRange.push(getThisMonthStart())
        this.dateRange.push(getThisMonthEnd())
      } else if (val === '上月') {
        this.dateRange.push(getLastMonthStart())
        this.dateRange.push(getLastMonthEnd())
      }
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
    confirmDateRegion: function() {
      console.log('confirmDateRegion')
    },
    retrieveData() {
      this.orders = []
      if (this.dateRange.length === 0) {
        return
      }
      if (this.branchId === '') {
        return
      }
      var repdatefrom = parseTime(new Date(this.dateRange[0]), '{y}-{m}-{d}')
      var repdateto = parseTime(new Date(this.dateRange[1]), '{y}-{m}-{d}')
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
