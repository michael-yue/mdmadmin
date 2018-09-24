<template>
  <div class="finprofilereport">
    <div class="block">
      <el-date-picker
        v-model="selectedMonth"
        type="month"
        placeholder="选择月">
      </el-date-picker>
    </div>
    <el-table :data="tableData3" border size="small" style="margin:15px 5px" height="550">
      <el-table-column fixed prop="itemname" label="项目" width="250" header-align="center" align="left" />
      <el-table-column label="2018年1月" header-align="center">
        <el-table-column prop="planamount" label="计划" width="100" header-align="center" align="right" />
        <el-table-column prop="planpercent" label="%" width="80" header-align="center" align="right" />
        <el-table-column prop="actualamount" label="实际" width="100" header-align="center" align="right" />
        <el-table-column prop="actualpercent" label="%" width="80" header-align="center" align="right" />
        <el-table-column prop="diffamount" label="差异" width="100" header-align="center" align="right" />
        <el-table-column prop="diffpercent" label="%" width="80" header-align="center" align="right" />
        <el-table-column prop="lastyearamount" label="去年同期" width="100" header-align="center" align="right" />
        <el-table-column prop="lastyearpercent" label="%" width="80" header-align="center" align="right" />
        <el-table-column prop="lastyeardiffamount" label="差异" width="100" header-align="center" align="right" />
        <el-table-column prop="lastyeardiffpercent" label="%" width="80" header-align="center" align="right" />
        <el-table-column prop="thisyearsummaryamount" label="今年累计" width="100" header-align="center" align="right" />
        <el-table-column prop="thisyearsummarydiffpercent" label="%" width="80" header-align="center" align="right" />
        <el-table-column prop="lastyearsummaryamount" label="去年累计" width="100" header-align="center" align="right" />
        <el-table-column prop="lastyearsummarydiffpercent" label="%" width="80" header-align="center" align="right" />
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {fin} from '@/api/finreport'
export default {
  name: 'FinProfileReport',
  data() {
    return {
      selectedMonth: '',
      tableData3: [{
        itemname: '一、营业收入',
        planamount: 490000,
        planpercent: '0.0%',
        actualamount: 123123,
        actualpercent: '0.0%',
        diffamount: -12312,
        diffpercent: '23.2%',
        lastyearamount: 509000,
        lastyearpercent: '3.4%',
        lastyeardiffamount: 234,
        lastyeardiffpercent: '3.3%',
        thisyearsummaryamount: 123123,
        thisyearsummarydiffpercent: '23',
        lastyearsummaryamount: 123123,
        lastyearsummarydiffpercent: '23'
      }, {
        itemname: ' 早餐',
        planamount: 490000,
        planpercent: '0.0%',
        actualamount: 123123,
        actualpercent: '0.0%',
        diffamount: -12312,
        diffpercent: '23.2%',
        lastyearamount: 509000,
        lastyearpercent: '3.4%',
        lastyeardiffamount: 234,
        lastyeardiffpercent: '3.3%',
        thisyearsummaryamount: 123123,
        thisyearsummarydiffpercent: '23',
        lastyearsummaryamount: 123123,
        lastyearsummarydiffpercent: '23'
      }, {
        itemname: '正餐',
        planamount: 490000,
        planpercent: '0.0%',
        actualamount: 123123,
        actualpercent: '0.0%',
        diffamount: -12312,
        diffpercent: '23.2%',
        lastyearamount: 509000,
        lastyearpercent: '3.4%',
        lastyeardiffamount: 234,
        lastyeardiffpercent: '3.3%',
        thisyearsummaryamount: 123123,
        thisyearsummarydiffpercent: '23',
        lastyearsummaryamount: 123123,
        lastyearsummarydiffpercent: '23'
      }, {
        itemname: '饮品',
        planamount: 490000,
        planpercent: '0.0%',
        actualamount: 123123,
        actualpercent: '0.0%',
        diffamount: -12312,
        diffpercent: '23.2%',
        lastyearamount: 509000,
        lastyearpercent: '3.4%',
        lastyeardiffamount: 234,
        lastyeardiffpercent: '3.3%',
        thisyearsummaryamount: 123123,
        thisyearsummarydiffpercent: '23',
        lastyearsummaryamount: 123123,
        lastyearsummarydiffpercent: '23'
      }, {
        itemname: '外卖',
        planamount: 490000,
        planpercent: '0.0%',
        actualamount: 123123,
        actualpercent: '0.0%',
        diffamount: -12312,
        diffpercent: '23.2%',
        lastyearamount: 509000,
        lastyearpercent: '3.4%',
        lastyeardiffamount: 234,
        lastyeardiffpercent: '3.3%',
        thisyearsummaryamount: 123123,
        thisyearsummarydiffpercent: '23',
        lastyearsummaryamount: 123123,
        lastyearsummarydiffpercent: '23'
      }, {
        itemname: '二、食品成本',
        planamount: 490000,
        planpercent: '0.0%',
        actualamount: 123123,
        actualpercent: '0.0%',
        diffamount: -12312,
        diffpercent: '23.2%',
        lastyearamount: 509000,
        lastyearpercent: '3.4%',
        lastyeardiffamount: 234,
        lastyeardiffpercent: '3.3%',
        thisyearsummaryamount: 123123,
        thisyearsummarydiffpercent: '23',
        lastyearsummaryamount: 123123,
        lastyearsummarydiffpercent: '23'
      }]
    }
  },
  created: function() {
    console.info('create')
    this.retriveData()
  },
  methods: {
    retriveData: function() {
      console.log('data')
    }
  }
}
</script>

<style scoped>
.textright{ text-align: right}
</style>
