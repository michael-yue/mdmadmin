<template>
  <div class="orderlist">
    <el-card style="margin:20px">
      <SelectBranch typeclass="all" @BranchChanged="branchChangedEvent"/>
      <el-radio-group v-model="reporttype" size="small">
        <el-radio-button label="本期" />
        <el-radio-button label="上期" />
      </el-radio-group>
      <el-date-picker
        v-model="dateRange"
        :default-time="['00:00:00', '23:59:59']"
        type="daterange"
        size="small"
        start-placeholder="开始日期"
        end-placeholder="结束日期" />
    </el-card>
    <div style="margin:20px">
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
      reporttype:''
    }
  },
  watch: {
    dateRange: function(val, oldval) {
      this.retrieveData()
    },
    reporttype: function(val, oldval) {
      this.dateRange = []
      if (val === '本期') {
        this.dateRange.push(getThisPeriodStart())
        this.dateRange.push(getThisPeriodEnd())
      } else if (val === '上期') {
        this.dateRange.push(getLastPeriodStart())
        this.dateRange.push(getLastPeriodEnd())
      }
    }
  },
  methods: {
    branchChangedEvent(event) {
      this.branchId = event.branchId
      this.retrieveData()
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
      getPeriodCashReportData(this.branchId, repdatefrom, repdateto).then(response => {
        this.orders = response.data
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
