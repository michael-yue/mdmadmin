<template>
  <div class="orderlist">
    <div ref="critheader" style="padding:10px 20px">
      <el-card>
        <SelectBranch typeclass="all" @BranchChanged="branchChangedEvent"/>
        <!-- <el-radio-group v-model="reporttype" size="small">
          <el-radio-button label="昨日" />
          <el-radio-button label="本期" />
          <el-radio-button label="上期" />
          <el-radio-button label="本月" />
          <el-radio-button label="上月" />
        </el-radio-group> -->
        <span style="font-size:14px">选择日期：</span>
        <el-date-picker
          v-model="dateRange"
          :default-time="['00:00:00', '23:59:59']"
          :picker-options="pickerOptions"
          type="daterange"
          format="yyyy 年 MM 月 dd 日"
          size="small"
          start-placeholder="开始日期"
          end-placeholder="结束日期" />
      </el-card>
    </div>
    <div :style="{height: myHeight}" style="padding:0 20px 10px 20px;">
      <div ref="reportheader" class="reportheader">
        <div class="reportname">产品销售报表</div>
        <div style="display:flex; font-size:14px;color:#606266">
          <div style="flex:1 1 auto; text-align:right"> 报表日期：{{ repdate }}</div>
        </div>
      </div>
      <el-table v-loading="loading" :data="reportData" :summary-method="getSummaries" :header-cell-style="tableheader" show-summary border size="small" height="100%">
        <el-table-column prop="prodtype" label="类型" width="80"/>
        <el-table-column prop="prodId" label="代码" width="80"/>
        <el-table-column prop="prodName" label="名称"/>
        <el-table-column prop="prodPrice" label="单价" width="80" align="right"/>
        <el-table-column prop="salesQty" label="出品数量" align="right" width="100"/>
        <el-table-column prop="salesAmount" label="出品金额" align="right" width="100"/>
        <el-table-column prop="returnQty" label="退单数量" align="right" width="100"/>
        <el-table-column prop="returnAmount" label="退单金额" align="right" width="100"/>
        <el-table-column prop="managerQty" label="经理餐数量" align="right" width="100"/>
        <el-table-column prop="managerAmount" label="经理餐金额" align="right" width="100"/>
      </el-table>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import SelectBranch from '@/components/widgets/SelectBranch'
import { getSalesReportData } from '@/api/finreport'
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
      reportData: [],
      myHeight: '',
      // reporttype: '',
      repdate: '',
      dateRange: [],
      loading: false,
      pickerOptions: {
        shortcuts: [
          {
            text: '昨日',
            onClick(picker) {
              picker.$emit('pick', [getYesterday(), getYesterday()])
            }
          }, {
            text: '本期',
            onClick(picker) {
              picker.$emit('pick', [getThisPeriodStart(), getThisPeriodEnd()])
            }
          }, {
            text: '上期',
            onClick(picker) {
              picker.$emit('pick', [getLastPeriodStart(), getLastPeriodEnd()])
            }
          }, {
            text: '本月',
            onClick(picker) {
              picker.$emit('pick', [getThisMonthStart(), getThisMonthEnd()])
            }
          }, {
            text: '上月',
            onClick(picker) {
              picker.$emit('pick', [getLastMonthStart(), getLastMonthEnd()])
            }
          }
        ]
      }
    }
  },
  watch: {
    dateRange: function(val, oldval) {
      this.retrieveData()
    }
    // reporttype: function(val, oldval) {
    //   this.dateRange = []
    //   if (val === '昨日') {
    //     this.dateRange.push(getYesterday())
    //     this.dateRange.push(getYesterday())
    //   } else if (val === '本期') {
    //     this.dateRange.push(getThisPeriodStart())
    //     this.dateRange.push(getThisPeriodEnd())
    //   } else if (val === '上期') {
    //     this.dateRange.push(getLastPeriodStart())
    //     this.dateRange.push(getLastPeriodEnd())
    //   } else if (val === '本月') {
    //     this.dateRange.push(getThisMonthStart())
    //     this.dateRange.push(getThisMonthEnd())
    //   } else if (val === '上月') {
    //     this.dateRange.push(getLastMonthStart())
    //     this.dateRange.push(getLastMonthEnd())
    //   }
    // }
  },
  mounted() {
    // set content height
    const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight // 浏览器高度
    const critheaderheight = this.$refs.critheader.offsetHeight
    const reportheaderheight = this.$refs.reportheader.offsetHeight
    this.myHeight = (h - critheaderheight - reportheaderheight - 50) + 'px'
    var that = this
    window.onresize = function windowResize() {
      const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight // 浏览器高度
      that.myHeight = (h - critheaderheight - reportheaderheight - 50) + 'px'
    }
  },
  created: function() {
    if (store.getters.roles.includes('branch')) {
      this.selectedBranch = store.getters.branches
      this.roleBranch = true
    }
  },
  methods: {
    branchChangedEvent(event) {
      this.selectedBranch = event.branchId
      this.retrieveData()
    },
    confirmDateRegion: function() {
      console.log('confirmDateRegion')
    },
    retrieveData() {
      this.reportData = []
      if (this.dateRange.length === 0) {
        return
      }
      if (this.selectedBranch === '') {
        return
      }
      this.loading = true
      var repdatefrom = parseTime(new Date(this.dateRange[0]), '{y}-{m}-{d}')
      var repdateto = parseTime(new Date(this.dateRange[1]), '{y}-{m}-{d}')
      this.repdate = parseTime(new Date(this.dateRange[0]), '{y}年{m}月{d}日') +
      '到' + parseTime(new Date(this.dateRange[1]), '{y}年{m}月{d}日')
      getSalesReportData(this.selectedBranch, repdatefrom, repdateto).then(response => {
        this.reportData = response.data
        this.loading = false
      }).catch(error => {
        console.log(error)
      })
    },
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (index === 5 || index === 7 || index === 9) {
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                return prev + curr
              } else {
                return prev
              }
            }, 0)
            sums[index] += ''
          } else {
            sums[index] = 'N/A'
          }
        }
      })
      return sums
    },
    /*
    * 以下设置class
    */
    tableheader({ row, index }) {
      return 'background:#DCDFE6;'
    }
  }
}
</script>

<style scoped>
.orderlist{display: flex; flex-direction: column;flex-flow: column;align-items: stretch;height:100%}
.ordercontents {display:flex; padding:5px; font-size:14px}
.billtype {flex:1 1 200px}
.amount{flex:1 1 200px; text-align: right}
.tableheader{background:#DCDFE6;}

.reportheader{display:flex;flex-direction:column;padding:10px}
.reportname{width:100%;text-align:center;font-size:16px;color:#606266}
</style>
