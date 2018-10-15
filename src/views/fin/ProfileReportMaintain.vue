<template>
  <div class="finprofilereportmaintain">
    <div ref="critheader" style="padding:10px 20px">
      <el-card>
        <SelectBranch typeclass="all" @BranchChanged="branchChangedEvent" />
        <el-date-picker v-model="selectedMonth" type="month" size="small" placeholder="选择月" style="width:120px"/>
        <el-button size="small" type="primary" style="margin-left:20px" @click="getData">确定</el-button>
        <el-button size="small" type="success" @click="saveData">保存</el-button>
      </el-card>
    </div>
    <div :style="{height: myHeight}" style="padding:0 20px 10px 20px;">
      <el-card>
        <el-table
          v-loading="loading"
          :data="monthdata"
          :cell-class-name="getCellClass"
          :header-cell-style="tableheader"
          border
          size="small"
          height="100%" >
          <el-table-column fixed prop="itemname" label="项目" width="200" header-align="center" align="left" />
          <el-table-column prop="planamount" label="计划" width="150" header-align="center" align="right">
            <template slot-scope="props">
              <div v-if="props.row.itemtype === '1'">
                <el-input v-focus-next-on-enter :ref= "props.row.itemid" v-model= "props.row.planamount" size="mini" />
              </div>
              <div v-else class="labelamount">
                {{ props.row.planamount }}
              </div>
            </template>
          </el-table-column>
          <el-table-column :formatter="formatplanpercent" prop="planpercent" label="%" width="150" header-align="center" align="right" />
          <el-table-column prop="actualamount" label="实际" width="150" header-align="center" align="right">
            <template slot-scope="props">
              <div v-if="props.row.itemtype === '1'">
                <el-input v-model= "props.row.actualamount" size="mini" />
              </div>
              <div v-else class="labelamount">
                {{ props.row.actualamount }}
              </div>
            </template>
          </el-table-column>
          <el-table-column :formatter="formatactualpercent" prop="actualpercent" label="%" width="150" header-align="center" align="right" />
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
import SelectBranch from '@/components/widgets/SelectBranch'
import { getProfileMonthData, saveProfileMonthData } from '@/api/finreport'
import { parseTime } from '@/utils'
import { calc } from '@/utils/formula'

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
            console.log('------------------------vnode-------------')
            console.log(vnode)
            console.log(value)
            const nextInput = vnode.context.$refs[value]
            // const nextInput = vnode.elm
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
      myHeight: '',
      active: false,
      loading: false
    }
  },
  watch: {
    branchId(val, oldval) {
      console.log(val)
    },
    monthdata: {
      handler(val, oldval) {
        this.computeAll(val)
      },
      deep: true
    }
  },
  mounted() {
    // set content height
    const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight // 浏览器高度
    const critheaderheight = this.$refs.critheader.offsetHeight
    this.myHeight = (h - critheaderheight - 50) + 'px'
    var that = this
    window.onresize = function windowResize() {
      const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight // 浏览器高度
      that.myHeight = (h - critheaderheight - 50) + 'px'
    }
  },
  created: function() {
  },
  methods: {
    formatplanpercent(row, column) {
      if (row.planpercent === '0') {
        return '-'
      } else {
        return Number(row.planpercent * 100).toFixed(2) + '%'
      }
    },
    formatactualpercent(row, column) {
      if (row.actualpercent === '0') {
        return '-'
      } else {
        return Number(row.actualpercent * 100).toFixed(2) + '%'
      }
    },
    branchChangedEvent(event) {
      this.branchId = event.branchId
    },
    checkCritia: function() {
      if (!this.branchId) {
        this.$message({
          message: '请先选择门店',
          type: 'warning'
        })
        return false
      }
      if (!this.selectedMonth) {
        this.$message({
          message: '请先选择月份',
          type: 'warning'
        })
        return false
      }
      return true
    },
    getData() {
      var that = this
      if (this.checkCritia()) {
        this.loading = true
        const year = parseTime(this.selectedMonth, '{y}')
        const month = parseTime(this.selectedMonth, '{m}')
        getProfileMonthData(year, month, this.branchId).then(response => {
          that.monthdata = response.data
          that.loading = false
        }).catch(error => {
          console.log(error)
        })
      }
    },
    // 保存数据
    saveData() {
      // this.selectedMonth check
      // this.branchId check
      const year = parseTime(this.selectedMonth, '{y}')
      const month = parseTime(this.selectedMonth, '{m}')
      saveProfileMonthData(year, month, this.branchId, this.monthdata).then(response => {
        console.log(response.data)
        this.$message({
          message: '保存成功',
          type: 'success'
        })
      }).catch(error => {
        console.log(error)
      })
    },
    /*
    * 以下设置class
    */
    tableheader({ row, index }) {
      return 'background:#DCDFE6;'
    },
    // 设置class缩进
    getCellClass: function({ row, column, rowIndex, columnIndex }) {
      let style = ''
      if (row.itemlevel === '0') {
        style = 'level0style'
      } else if (row.itemlevel === '1' && row.itemtype === '2') {
        style = 'level1style'
      }
      if (columnIndex === 0) {
        if (row.itemlevel !== '0') {
          style = style + ' indent' + row.itemlevel
        }
      }
      return style
    },
    // setitemfocused(item) {
    //   // this.active = true
    //   this.$nextTick(function() {
    //     this.monthdata.forEach(function(item) {
    //       item.active = false
    //     })
    //     item.active = true
    //   })
    // },
    // 计算
    computeAll(val) {
      // level 1, 计算计划金额中的level=2 and type = 2的，按顺序
      // console.log('--------------Level 2-----------------')
      for (let i = 0; i < val.length; i++) {
        if (val[i].itemlevel === '2' && val[i].itemtype === '2') {
          val = calc(val, i, 1)
          val = calc(val, i, 3)
        }
      }
      // console.log('--------------Level 1-----------------')
      for (let i = 0; i < val.length; i++) {
        if (val[i].itemlevel === '1' && val[i].itemtype === '2') {
          val = calc(val, i, 1)
          val = calc(val, i, 3)
        }
      }
      // console.log('--------------Level 0-----------------')
      for (let i = 0; i < val.length; i++) {
        if (val[i].itemlevel === '0' && val[i].itemtype === '2') {
          val = calc(val, i, 1)
          val = calc(val, i, 3)
        }
      }
      // level 2， 计算百分比
      // console.log('--------------Percent-----------------')
      for (let i = 0; i < val.length; i++) {
        // console.log('level:' + val[i].itemlevel + '-' + val[i].itemname + '-' + val[i].planamount + '-' + val[i].itempercentformula)
        val = calc(val, i, 2)
        val = calc(val, i, 4)
      }
    }
  }
}
</script>

<style scoped>
.name{flex-grow: 1;flex-shrink: 1;flex-basis: 0; font-size:12px; color:#303133}
.actualamount{flex-grow: 1;flex-shrink: 1;flex-basis: 0; width:100px}
.planamount{flex-grow: 1;flex-shrink: 1;flex-basis: 0; width:100px}
.active{background:#eef2fe}
.el-input >>> .el-input__inner { text-align: right; }
.labelamount{padding-right:16px;font-size:12px;font-family:sans-serif}
.finprofilereportmaintain{height:100%}
.el-card >>> .el-card__body {height:100%}
.el-card{height:100%}
</style>
