<template>
  <div class="orderlist">
    <div ref="critheader" style="padding:10px 20px">
      <el-card>
        <SelectBranch typeclass="all" @BranchChanged="branchChangedEvent"/>
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
      <div ref="reportheader" style="display:flex;flex-direction:column;padding:10px">
        <div style="width:100%;text-align:center;font-size:16px;color:#606266">现金收入汇总表</div>
        <div style="display:flex; font-size:14px;color:#606266">
          <div style="flex:1 1 auto; text-align:right"> 报表日期：{{ repdate }}</div>
        </div>
      </div>
      <el-table :data="tableData" :header-cell-style="tableheader" border size="small" height="100%">
        <el-table-column v-if="!firstshow" fixed prop="item" label="项目" width="150" header-align="center" align="left" />
        <el-table-column
          v-for="item1 in tableConfig"
          :label="item1.label"
          :prop="item1.prop"
          :width="item1.width"
          :key="item1.id"
          header-align="center"
          align="right" />
        <el-table-column v-if="!firstshow" prop="amountsummary" label="合计" width="" header-align="center" align="right" />
      </el-table>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import SelectBranch from '@/components/widgets/SelectBranch'
import { getCashPeriodReportData } from '@/api/finreport'
import { parseTime, getThisPeriodStart, getThisPeriodEnd,
  getLastPeriodStart, getLastPeriodEnd } from '@/utils'
export default {
  name: 'CashPeriodReport',
  components: {
    SelectBranch
  },
  data() {
    return {
      selectedBranch: '',
      branches: [],
      orders: [],
      dateRange: [],
      // reporttype: '',
      repdate: '',
      tableData: [],
      tableConfig: [],
      myHeight: '',
      firstshow: true,
      pickerOptions: {
        shortcuts: [
          {
            text: '本期',
            onClick(picker) {
              picker.$emit('pick', [getThisPeriodStart(), getThisPeriodEnd()])
            }
          }, {
            text: '上期',
            onClick(picker) {
              picker.$emit('pick', [getLastPeriodStart(), getLastPeriodEnd()])
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
    retrieveData() {
      this.orders = []
      if (this.dateRange.length === 0) {
        return
      }
      if (this.selectedBranch === '') {
        return
      }
      var repdatefrom = parseTime(new Date(this.dateRange[0]), '{y}-{m}-{d}')
      var repdateto = parseTime(new Date(this.dateRange[1]), '{y}-{m}-{d}')
      this.repdate = parseTime(new Date(this.dateRange[0]), '{y}年{m}月{d}日') +
      '到' + parseTime(new Date(this.dateRange[1]), '{y}年{m}月{d}日')
      getCashPeriodReportData(this.selectedBranch, repdatefrom, repdateto).then(response => {
        this.firstshow = false
        this.tableData = response.data.tabledata
        this.tableConfig = response.data.tableheader
      }).catch(error => {
        console.log(error)
      })
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
