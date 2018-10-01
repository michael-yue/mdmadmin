<template>
  <div class="finprofilereportmaintain">
    <el-card style="margin:20px">
      <SelectBranch @BranchChanged="branchChangedEvent" />
      <el-date-picker v-model="selectedMonth" type="month" size="small" placeholder="选择月" style="width:120px"/>
      <el-button size="small" type="primary" style="margin-left:20px" @click="getData">确定</el-button>
      <el-button size="small" type="success" @click="saveData">保存</el-button>
    </el-card>
    <el-card style="margin:20px">
      <el-table :data="monthdata" :cell-class-name="getCellClass" border size="small" height="850" >
        <el-table-column fixed prop="itemname" label="项目" width="200" header-align="center" align="left" />
        <el-table-column prop="planamount" label="计划" width="200" header-align="center" align="right">
          <template slot-scope="props">
            <el-input v-model= "props.row.planamount" size="mini" type="number" />
          </template>
        </el-table-column>
        <el-table-column prop="actualamount" label="实际" width="200" header-align="center" align="right">
          <template slot-scope="props">
            <el-input v-model= "props.row.actualamount" size="mini" style="width:100px;text-align:center"/>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import SelectBranch from '@/components/widgets/SelectBranch'
import { getProfileMonthData, saveProfileMonthData } from '@/api/finreport'

export default {
  name: 'FinProfileReportMaintain',
  components: {
    SelectBranch
  },
  data() {
    return {
      selectedMonth: '',
      branchId: '',
      monthdata: [],
      active: false
    }
  },
  watch: {
    branchId(val, oldval) {
      console.log(val)
    }
  },
  created: function() {
    // this.getData()
  },
  methods: {
    branchChangedEvent(event) {
      console.log('parent : ' + event.branchId)
      this.branchId = event.branchId
    },
    getData() {
      var that = this
      getProfileMonthData().then(response => {
        that.monthdata = response.data
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },
    saveData() {
      console.log(this.monthdata)
      saveProfileMonthData(this.selectedMonth, this.branchId, this.monthdata).then(response => {
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },
    getCellClass: function({ row, column, rowIndex, columnIndex }) {
      // 第八列添加 red 类
      // console.log(row, column, rowIndex, columnIndex)
      if (columnIndex === 0) {
        if (row.itemlevel !== '0') {
          return 'indent' + row.itemlevel
        }
      } else {
        return ''
      }
    },
    setitemfocused(item) {
      // this.active = true
      this.$nextTick(function() {
        this.monthdata.forEach(function(item) {
          item.active = false
        })
        item.active = true
      })
    }
  }
}
</script>

<style scoped>
ul.profilereport{
  list-style-type: none;
  margin: 5px;
  padding: 0px 0px;
  display: block;
}
ul.profilereport>li {
  width: 100%;
  padding-left: 0px;
  /* border-bottom: solid 1px #ebebeb; */
  display: inline-flex;padding: 5px 40px;
  align-items:center
}
.inputcontent{width:100%; display: inline-flex;padding: 5px 0px}
.name{flex-grow: 1;flex-shrink: 1;flex-basis: 0; font-size:12px; color:#303133}
.actualamount{flex-grow: 1;flex-shrink: 1;flex-basis: 0; width:100px}
.planamount{flex-grow: 1;flex-shrink: 1;flex-basis: 0; width:150px}
.active{background:#eef2fe}
.textright{text-align:right}
</style>

