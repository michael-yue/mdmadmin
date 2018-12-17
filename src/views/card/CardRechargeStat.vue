<template>
  <div class="cardrechargelist">
    <div ref="critheader" style="padding:10px 20px">
      <el-card>
        <SelectBranch typeclass="all" @BranchChanged="branchChangeEvent"/>
        <span style="font-size:14px">选择日期：</span>
        <el-date-picker
          v-model="dateRange"
          :default-time="['00:00:00', '23:59:59']"
          :picker-options="pickerOptions"
          type="daterange"
          format="yyyy年MM月dd日"
          size="small"
          start-placeholder="开始日期"
          end-placeholder="结束日期" />
          <!-- <el-button type="primary" plain size="small" style="margin-left:20px" @click="querystart" >查询</el-button> -->
      </el-card>
    </div>
    <div :style="{height: myHeight}" style="padding:0 20px 10px 20px;">
      <el-tabs v-model="activeIndex" type="border-card" style="height:100%" @tab-click="tabClick">
        <el-tab-pane label="按时间统计" name="first" class="fontColor">
          <el-table
            v-loading="loading"
            ref="dateTable"
            :data="tableData"
            :class="{'tablestyle': true}"
            :header-cell-style="tableheader"
            border
            size="small"
            height="100%">
            <el-table-column prop="customerid" label="会员卡号" width="" header-align="center" align="right" />
            <el-table-column prop="customername" label="会员卡号" width="" header-align="center" align="right" />
            <el-table-column prop="registdate" label="开卡时间" width="" header-align="center" label-class-name	="header" align="left" />
            <el-table-column prop="balance" label="余额" width="" header-align="center" align="right" />
            <el-table-column prop="status" label="状态" width="" header-align="center" align="right" />
          </el-table>
          <vpagination :total="total" :display="limit" :current-page="current" @pagechange="pagechange" />
        </el-tab-pane>
        <el-tab-pane label="按金额统计" name="second" class="fontColor">
          <el-table
            v-loading="loading"
            ref="amountTable"
            :data="tableData"
            :class="{'tablestyle': true}"
            :header-cell-style="tableheader"
            border
            size="small"
            height="100%">
            <el-table-column prop="customerid" label="会员卡号" width="" header-align="center" align="right" />
            <el-table-column prop="customername" label="会员卡号" width="" header-align="center" align="right" />
            <el-table-column prop="registdate" label="开卡时间" width="" header-align="center" label-class-name	="header" align="left" />
            <el-table-column prop="balance" label="余额" width="" header-align="center" align="right" />
            <el-table-column prop="status" label="状态" width="" header-align="center" align="right" />
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import SelectBranch from '@/components/widgets/SelectBranch'
import { parseTime, getYesterday, getThisPeriodStart, getThisPeriodEnd,
  getLastPeriodStart, getLastPeriodEnd, getThisMonthStart, getThisMonthEnd,
  getLastMonthStart, getLastMonthEnd } from '@/utils'
import vpagination from '@/components/widgets/Pagination'
import { listCardRechargeSum, listCardRechargeGroup } from '@/api/card.js'

export default {
  name: 'CardList',
  components: {
    SelectBranch,
    vpagination
  },
  data() {
    return {
      selectedBranch: '',
      myHeight: '',
      loading: false,
      reporttype: '',
      dateRange: [],
      activeIndex: 'first',
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
      },
      // 表格变量
      tableData: [],
      total: 0,
      limit: 15,
      current: 1
      // flag: false
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
    const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight // 浏览器高度
    const critheaderheight = this.$refs.critheader.offsetHeight
    // const statHeight = this.$refs.critheader.offsetHeight
    this.myHeight = (h - critheaderheight - 100) + 'px'
    var that = this
    window.onresize = function windowResize() {
      const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight // 浏览器高度
      that.myHeight = (h - critheaderheight - 100) + 'px'
    }
  },
  created: function() {
    if (store.getters.roles.includes('branch')) {
      this.selectedBranch = store.getters.branches
    }
  },
  methods: {
    branchChangeEvent: function(event) {
      this.selectedBranch = event.branchId
    },
    retrieveData: function(currentPage) {
      this.loading = true
      if (this.dateRange.length === 0) {
        this.$message({
          message: '请先选择日期区间',
          type: 'warning'
        })
        return
      }
      var repdatefrom = parseTime(new Date(this.dateRange[0]), '{y}-{m}-{d}')
      var repdateto = parseTime(new Date(this.dateRange[1]), '{y}-{m}-{d}')
      listAll(this.selectedBranch, repdatefrom, repdateto, currentPage, this.limit).then(response => {
        this.tableData = response.data
        this.total = response.data.totalnum
        this.loading = false
      }).catch(error => {
        console.log(error)
      })
    },
    querystart: function() {
      this.retrieveData(1)
    },
    tableheader({ row, index }) {
      return 'background:#DCDFE6;'
    },
    // 分页处理
    pagechange: function(currentPage) {
      // retrieveData(currentPage)
      this.retrieveData(currentPage)
    },
    tabClick: function() {
      console.log('teasdf')
    }
  }
}
</script>
