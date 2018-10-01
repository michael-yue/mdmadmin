<template>
  <div class="finprofilereport">
    <!-- <div class="block" style="margin:20px"> -->
    <el-card style="margin:20px">
      <div class="inlinelable">月份</div>
      <el-date-picker v-model="selectedMonthStart" type="month" size="small" placeholder="选择月" style="width:120px"/>
      <div class="inlinelable">到</div>
      <el-date-picker v-model="selectedMonthEnd" type="month" size="small" placeholder="选择月" style="width:120px"/>
      <SelectBranch @BranchChanged="branchChangeEvent" />
      <el-switch v-model="reporttype" active-text="汇总" inactive-text="明细" />
      <el-button type="primary" size="small" style="margin-left:40px" @click="getData">查询</el-button>
    <!-- </div> -->
    </el-card>
    <el-card style="margin:20px">
      <el-table :data="tableData" :cell-class-name="getCellClass" border size="small" style="margin:15px 5px" height="850" >
        <el-table-column fixed prop="itemname" label="项目" width="200" header-align="center" align="left" />
        <el-table-column label="2018年1月" header-align="center">
          <el-table-column prop="planamount" label="计划" width="80" header-align="center" align="right" />
          <el-table-column prop="planpercent" label="%" width="60" header-align="center" align="right" />
          <el-table-column prop="actualamount" label="实际" width="80" header-align="center" align="right" />
          <el-table-column prop="actualpercent" label="%" width="60" header-align="center" align="right" />
          <el-table-column prop="diffamount" label="差异" width="80" header-align="center" align="right" />
          <el-table-column prop="diffpercent" label="%" width="60" header-align="center" align="right" />
          <el-table-column prop="lastyearamount" label="去年同期" width="80" header-align="center" align="right" />
          <el-table-column prop="lastyearpercent" label="%" width="60" header-align="center" align="right" />
          <el-table-column prop="lastyeardiffamount" label="差异" width="80" header-align="center" align="right" />
          <el-table-column prop="lastyeardiffpercent" label="%" width="60" header-align="center" align="right" />
          <el-table-column prop="thisyearsummaryamount" label="今年累计" width="100" header-align="center" align="right" />
          <el-table-column prop="thisyearsummarydiffpercent" label="%" width="60" header-align="center" align="right" />
          <el-table-column prop="lastyearsummaryamount" label="去年累计" width="100" header-align="center" align="right" />
          <el-table-column prop="lastyearsummarydiffpercent" label="%" width="60" header-align="center" align="right" />
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getReportData } from '@/api/finreport'
import SelectBranch from '@/components/widgets/SelectBranch'

export default {
  name: 'FinProfileReport',
  components: {
    SelectBranch
  },
  data() {
    return {
      selectedMonthStart: '',
      selectedMonthEnd: '',
      selectedBranch: '',
      reporttype: false,
      tableData: []
    }
  },
  watch: {
    selectedMonthStart(val, oldval) {
      if (val !== oldval) {
        this.getReportData()
      }
    },
    selectedMonthEnd(val, oldval) {
      if (val !== oldval) {
        this.getReportData()
      }
    },
    selectedBranch(val, oldval) {
      if (val !== oldval) {
        this.getReportData()
      }
    }
  },
  created: function() {
    // this.getReportData()
  },
  methods: {
    branchChangeEvent: function(event) {
      this.selectBranch = event.branchId
    },
    getCellClass: function({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (row.itemlevel !== '0') {
          return 'indent' + row.itemlevel
        }
      } else {
        return ''
      }
    },
    getData: function() {
      var that = this
      getReportData().then(response => {
        that.tableData = response.data
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style scope>
.textright{ text-align: right}
.inlinelable {position:relative;font-size:14px;display:inline-block;margin:0px}
</style>
