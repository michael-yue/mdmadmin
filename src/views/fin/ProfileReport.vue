<template>
  <div class="finprofilereport">
    <div ref="critheader" style="padding:20px">
      <el-card>
        <div class="inlinelable">月份</div>
        <el-date-picker v-model="selectedMonthStart" type="month" size="small" placeholder="选择月" style="width:120px"/>
        <div class="inlinelable">到</div>
        <el-date-picker v-model="selectedMonthEnd" type="month" size="small" placeholder="选择月" style="width:120px"/>
        <SelectBranch @BranchChanged="branchChangeEvent" />
        <el-switch v-model="reporttype" active-text="汇总" inactive-text="明细" />
        <el-button type="primary" size="small" style="margin-left:40px" @click="getData">查询</el-button>
      </el-card>
    </div>
    <div :style="{height: myHeight}" style="padding:0 20px 10px 20px;">
      <div class="showcriteria">
        <el-checkbox-group v-model="checkboxGroup" size="small" style="padding:10px;text-align:right">
          <el-checkbox-button v-for="city in cities" :label="city" :key="city">{{ city }}</el-checkbox-button>
        </el-checkbox-group>
      </div>
      <el-card>
        <el-table
          :data="tableData"
          :cell-class-name="getCellClass"
          border
          size="small"
          height="100%" >
          <el-table-column fixed prop="itemname" label="项目" width="200" header-align="center" align="left" />
          <el-table-column
            v-for="item in tableConfig"
            :label="item.label"
            :prop="item.prop"
            :width="item.width"
            :key="item.id"
            header-align="center"
            align="right">
            <el-table-column
              v-for="item1 in item.children"
              v-if="item.children||item.children.length>0"
              :label="item1.label"
              :prop="item1.prop"
              :width="item1.width"
              :key="item1.id"
              :formatter="formatpercent"
              header-align="center"
              align="right" />
              <!-- <template slot-scope="scope">
                <div>scope.row.</div>
              </template> -->
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getReportData } from '@/api/finreport'
import SelectBranch from '@/components/widgets/SelectBranch'
import { parseTime } from '@/utils'

const cityOptions = ['计划', '实际', '差异', '去年同期', '今年累计', '去年累计']

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
      myHeight: '',
      tableData: [],
      tableConfig: [],
      checkboxGroup: [],
      cities: cityOptions
    }
  },
  created: function() {
    // this.getReportData()
  },
  mounted() {
    // set content height
    const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight // 浏览器高度
    const critheaderheight = this.$refs.critheader.offsetHeight
    this.myHeight = (h - critheaderheight - 102) + 'px'
    var that = this
    window.onresize = function windowResize() {
      const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight // 浏览器高度
      that.myHeight = (h - critheaderheight - 102) + 'px'
    }
  },
  methods: {
    branchChangeEvent: function(event) {
      this.selectedBranch = event.branchId
    },
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
    formatactualpercent: function() {

    },
    getData: function() {
      const fromyear = parseTime(this.selectedMonthStart, '{y}')
      const frommonth = parseTime(this.selectedMonthStart, '{m}')
      const toyear = parseTime(this.selectedMonthEnd, '{y}')
      const tomonth = parseTime(this.selectedMonthEnd, '{m}')
      // this.selectedBranch
      var that = this
      this.tableData = []
      getReportData(fromyear, frommonth, toyear, tomonth, this.selectedBranch, this.reporttype).then(response => {
        that.tableConfig = response.data.tableheader
        that.tableData = response.data.tabledata
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
.textright{ text-align: right}
.inlinelable {position:relative;font-size:14px;display:inline-block;margin:0px}
.finprofilereport{height:100%}
.el-card >>> .el-card__body {height:100%}
.el-card{height:100%}
</style>
