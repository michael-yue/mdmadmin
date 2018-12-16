<template>
  <div class="cardlist">
    <div ref="critheader" style="padding:10px 20px">
      <el-card>
        <span style="font-size:14px">开卡日期：</span>
        <el-date-picker
          v-model="dateRange"
          :default-time="['00:00:00', '23:59:59']"
          :picker-options="pickerOptions"
          type="daterange"
          format="yyyy年MM月dd日"
          size="small"
          stripe
          start-placeholder="开始日期"
          end-placeholder="结束日期" />
      </el-card>
    </div>
    <div :style="{height: myHeight}" style="padding:0 20px 10px 20px;">
      <el-table
        v-loading="loading"
        ref="refTable"
        :data="tableData"
        :class="{'tablestyle': true}"
        :header-cell-style="tableheader"
        border
        size="small"
        height="100%">
        <el-table-column prop="code" sortable label="门店代码" width="" header-align="center" align="right" />
        <el-table-column prop="name" label="门店名称" width="" header-align="center" align="right" />
        <el-table-column prop="amount" sortable label="合计储值金额" width="" header-align="center" align="right" />
        <el-table-column prop="addamount" sortable label="合计赠送金额" width="" header-align="center" label-class-name	="header" align="right" />
        <el-table-column prop="numcount" sortable label="储值笔数" width="" header-align="center" align="right" />
      </el-table>
    </div>
  </div>
</template>

<script>
import { listStatByBranch } from '@/api/card.js'
import { parseTime, getYesterday, getThisPeriodStart, getThisPeriodEnd,
  getLastPeriodStart, getLastPeriodEnd, getThisMonthStart, getThisMonthEnd,
  getLastMonthStart, getLastMonthEnd } from '@/utils'
export default {
  name: 'CardList',
  data() {
    return {
      myHeight: '',
      loading: false,
      dateRange: [],
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
      tableData: []
      // flag: false
    }
  },
  watch: {
    dateRange: function(val, oldval) {
      this.retrieve()
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
    this.myHeight = (h - critheaderheight - 50) + 'px'
    var that = this
    window.onresize = function windowResize() {
      const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight // 浏览器高度
      that.myHeight = (h - critheaderheight - 50) + 'px'
    }
  },
  methods: {
    retrieve: function() {
      if (this.dateRange.length === 0) {
        this.$message({
          message: '请先选择日期区间',
          type: 'warning'
        })
        return
      }
      var repdatefrom = parseTime(new Date(this.dateRange[0]), '{y}-{m}-{d}')
      var repdateto = parseTime(new Date(this.dateRange[1]), '{y}-{m}-{d}')
      this.loading = true
      listStatByBranch(repdatefrom, repdateto, 0).then(response => {
        this.tableData = response.data
        this.total = response.data.totalnum
        this.loading = false
      }).catch(error => {
        console.log(error)
      })
    },
    tableheader({ row, index }) {
      return 'background:#DCDFE6;'
    }
  }
}
</script>
