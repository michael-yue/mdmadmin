<template>
  <div class="finprofilereport">
    <div ref="critheader" style="padding:10px 20px">
      <el-card>
        <div class="inlinelabel">月份</div>
        <el-date-picker v-model="selectedMonthStart" type="month" size="small" placeholder="选择月" style="width:120px"/>
        <div class="inlinelabel">到</div>
        <el-date-picker v-model="selectedMonthEnd" type="month" size="small" placeholder="选择月" style="width:120px"/>
        <SelectBranch typeclass="all" @BranchChanged="branchChangeEvent" />
        <el-switch v-model="reporttype" active-text="汇总" inactive-text="明细" />
        <el-button :loading="loading" type="primary" size="small" style="margin-left:40px" @click="getData">查询</el-button>
      </el-card>
    </div>
    <div :style="{height: myHeight}" style="padding:0 20px 10px 20px;">
      <div ref="showcriteria" class="showcriteria" style="display:flex;justify-content:flex-end;padding:10px">
        <div>
          <el-checkbox-group v-model="showcols" :min="1" :max="shows.length" size="small" >
            <el-checkbox v-for="show in shows" :label="show.key" :key="show.key" :disabled="show.disabled" border>{{ show.name }}</el-checkbox>
          </el-checkbox-group>
        </div>
        <div style="margin-left:20px">
          <el-button :loading="downloading" type="primary" plain size="small" icon="document" @click="handleDownload">导出excel</el-button>
        </div>
      </div>
      <el-table
        id="datatable"
        :data="tableData"
        :cell-class-name="getCellClass"
        border
        size="small"
        height="100%">
        <el-table-column v-if="!firstshow" fixed prop="itemname" label="项目" width="200" header-align="center" align="left" />
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
            v-if="(item.children||item.children.length>0) && (showcols.includes(item1.typeclass))"
            :label="item1.label"
            :prop="item1.prop"
            :width="item1.width"
            :key="item1.id"
            header-align="center"
            align="right" />
            <!-- <template slot-scope="scope">
              <div>scope.row.</div>
            </template> -->
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getReportData } from '@/api/finreport'
import SelectBranch from '@/components/widgets/SelectBranch'
import { parseTime } from '@/utils'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'

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
      shows: [
        { 'key': 'plan', 'name': '计划', 'disabled': false },
        { 'key': 'actual', 'name': '实际', 'disabled': false },
        { 'key': 'diff', 'name': '差异', 'disabled': false },
        { 'key': 'lastyear', 'name': '去年同期', 'disabled': false },
        { 'key': 'lastyeardiff', 'name': '去年差异', 'disabled': false },
        { 'key': 'thisyearsummary', 'name': '今年累计', 'disabled': false },
        { 'key': 'lastyearsummary', 'name': '去年累计', 'disabled': false }],
      firstshow: true,
      showcols: ['plan', 'actual', 'diff', 'lastyear', 'lastyeardiff', 'thisyearsummary', 'lastyearsummary'],
      loading: false,
      downloading: false
    }
  },
  watch: {
    reporttype: function(val, oldval) {
      // 这里可以优化，减少一个，只留shows
      if (val !== oldval) {
        this.tableData = []
      }
      var a = 0
      if (val) {
        this.showcols = this.showcols.filter(t => t !== 'thisyearsummary')
        this.showcols = this.showcols.filter(t => t !== 'lastyearsummary')
        a = this.shows.findIndex((value, index, arr) => {
          return value.key === 'thisyearsummary'
        })
        this.shows[a].disabled = true
        a = this.shows.findIndex((value, index, arr) => {
          return value.key === 'lastyearsummary'
        })
        this.shows[a].disabled = true
      } else {
        this.showcols.push('thisyearsummary')
        this.showcols.push('lastyearsummary')
        a = this.shows.findIndex((value, index, arr) => {
          return value.key === 'thisyearsummary'
        })
        this.shows[a].disabled = false
        a = this.shows.findIndex((value, index, arr) => {
          return value.key === 'lastyearsummary'
        })
        this.shows[a].disabled = false
      }
    }
  },
  created: function() {
    // this.getReportData()
  },
  mounted() {
    // set content height
    const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight // 浏览器高度
    const critheaderheight = this.$refs.critheader.offsetHeight
    const showcriteriaheight = this.$refs.showcriteria.offsetHeight
    this.myHeight = (h - critheaderheight - showcriteriaheight - 50) + 'px'
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
    handleDownload() {
      this.downloading = true
      var fix = document.querySelector('.el-table__fixed')
      var wb
      if (fix) {
        wb = XLSX.utils.table_to_book(document.querySelector('#datatable').removeChild(fix))
        document.querySelector('#datatable').appendChild(fix)
      } else {
        wb = XLSX.utils.table_to_book(document.querySelector('#datatable'))
      }

      /* get binary string as output */
      var wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array'
      })
      try {
        FileSaver.saveAs(
          new Blob([wbout], {
            type: 'application/octet-stream'
          }),
          '利润表.xlsx'
        )
      } catch (e) {
        if (typeof console !== 'undefined') console.log(e, wbout)
      }
      this.downloading = false
      return wbout
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    checkCritia: function() {
      if (!this.selectedBranch) {
        this.$message({
          message: '请先选择门店',
          type: 'warning'
        })
        return false
      }
      if (!this.selectedMonthStart) {
        this.$message({
          message: '请先选择开始月份',
          type: 'warning'
        })
        return false
      }
      if (!this.selectedMonthEnd) {
        this.$message({
          message: '请先选择结束月份',
          type: 'warning'
        })
        return false
      }
      return true
    },
    getData: function() {
      // check input
      if (!this.checkCritia()) {
        return
      }
      const fromyear = parseTime(this.selectedMonthStart, '{y}')
      const frommonth = parseTime(this.selectedMonthStart, '{m}')
      const toyear = parseTime(this.selectedMonthEnd, '{y}')
      const tomonth = parseTime(this.selectedMonthEnd, '{m}')
      var that = this
      this.tableData = []
      this.loading = true
      getReportData(fromyear, frommonth, toyear, tomonth, this.selectedBranch, this.reporttype).then(response => {
        that.firstshow = false
        that.tableConfig = response.data.tableheader
        that.tableData = response.data.tabledata
        this.loading = false
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
.inlinelabel {position:relative;font-size:14px;display:inline-block;margin:0px}
.finprofilereport{height:100%}
</style>
