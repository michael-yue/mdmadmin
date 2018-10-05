<template>
  <div class="finprofilereportmaintain">
    <el-card style="margin:20px">
      <SelectBranch @BranchChanged="branchChangedEvent" />
      <el-date-picker v-model="selectedMonth" type="month" size="small" placeholder="选择月" style="width:120px"/>
      <el-button size="small" type="primary" style="margin-left:20px" @click="getData">确定</el-button>
      <el-button size="small" type="success" @click="saveData">保存</el-button>
    </el-card>
    <el-card style="margin:20px">
      <el-table :data="monthdata" :cell-class-name="getCellClass" border size="small" height="700" >
        <el-table-column fixed prop="itemname" label="项目" width="200" header-align="center" align="left" />
        <el-table-column prop="planamount" label="计划" width="200" header-align="center" align="right">
          <template slot-scope="props">
            <div v-if="props.row.itemtype === '1'">
              <el-input v-focus-next-on-enter v-model= "props.row.planamount" size="mini" @keyup.enter="nextTick" />
            </div>
            <div v-else class="labelamount">
              {{ props.row.planamount }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="planpercent" label="%" width="200" header-align="center" align="right" />
        <el-table-column prop="actualamount" label="实际" width="200" header-align="center" align="right">
          <template slot-scope="props">
            <div v-if="props.row.itemtype === '1'">
              <el-input v-model= "props.row.actualamount" size="mini" />
            </div>
            <div v-else class="labelamount">
              {{ props.row.planamount }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="actualpercent" label="%" width="200" header-align="center" align="right" />
      </el-table>
    </el-card>
  </div>
</template>

<script>
import SelectBranch from '@/components/widgets/SelectBranch'
import { getProfileMonthData, saveProfileMonthData } from '@/api/finreport'
import { parseTime } from '@/utils'
// import { calc } from '@/utils/formula'

export default {
  name: 'FinProfileReportMaintain',
  components: {
    SelectBranch
  },
  directives: {
    focusNextOnEnter: {
      bind: function(el, { value }, vnode) {
        el.addEventListener('keyup', (ev) => {
          if (ev.keyCode === 13) {
            console.log(vnode)
            console.log(value)
            // const nextInput = vnode.context.$refs[value]
            const nextInput = vnode.elm
            console.log(nextInput)
            if (nextInput && typeof nextInput.focus === 'function') {
              nextInput.focus()
              nextInput.select()
            }
          }
        })
      }
    }
  },
  data() {
    return {
      selectedMonth: '',
      branchId: '',
      monthdata: [],
      active: false
    }
  },
  computed: {
    totalLine: function() {
      var totalline = 0
      for (let i = 0; i < this.monthdata.length; i++) {
        totalline = totalline + 1
      }
      console.log(totalline)
      return totalline
    }
  },
  watch: {
    branchId(val, oldval) {
      console.log(val)
    },
    monthdata(val, oldval) {
      console.log(val)
      console.log(this.monthdata.indexOf(1))
    }
  },
  created: function() {
    // this.getData()
    // var test1 = '1+((2-3)*5+10)/3'
    // var result1 = calc(test1)
    // console.log(test1 + ' = ' + result1)
  },
  methods: {
    branchChangedEvent(event) {
      this.branchId = event.branchId
    },
    getData() {
      var that = this
      const year = parseTime(this.selectedMonth, '{y}')
      const month = parseTime(this.selectedMonth, '{m}')
      getProfileMonthData(year, month, this.branchId).then(response => {
        that.monthdata = response.data
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },
    saveData() {
      // this.selectedMonth check
      // this.branchId check
      const year = parseTime(this.selectedMonth, '{y}')
      const month = parseTime(this.selectedMonth, '{m}')
      saveProfileMonthData(year, month, this.branchId, this.monthdata).then(response => {
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
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
.el-input >>> .el-input__inner {
    text-align: right;
    /* background: #fe2; */
}
.el-table th{
  background: #c0c0d0;
}
.labelamount{padding-right:16px;font-size:12px;font-family:sans-serif}
</style>

