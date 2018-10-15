<template>
  <div class="finprofilereport">
    <div ref="critheader" style="padding:10px 20px">
      <el-card>
        <div class="inlinelable">月份</div>
        <el-date-picker v-model="selectedMonthStart" type="month" size="small" placeholder="选择月" style="width:120px"/>
        <div class="inlinelable">到</div>
        <el-date-picker v-model="selectedMonthEnd" type="month" size="small" placeholder="选择月" style="width:120px"/>
        <SelectBranch typeclass="all" @BranchChanged="branchChangeEvent" />
        <el-switch v-model="reporttype" active-text="汇总" inactive-text="明细" />
        <el-button :loading="loading" type="primary" size="small" style="margin-left:40px" @click="getData">查询</el-button>
      </el-card>
    </div>
    <div :style="{height: myHeight}" style="padding:0 20px 10px 20px;">
      <div class="showcriteria" style="display:flex;justify-content:flex-end;padding:10px">
        <div>
          <el-checkbox-group v-model="showcols" :min="1" :max="shows.length" size="small" >
            <el-checkbox v-for="show in shows" :label="show.key" :key="show.key" border>{{ show.name }}</el-checkbox>
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

const showOptions = [{ 'key': 'plan', 'name': '计划' },
  { 'key': 'actual', 'name': '实际' }, { 'key': 'diff', 'name': '差异' },
  { 'key': 'lastyear', 'name': '去年同期' }, { 'key': 'lastyeardiff', 'name': '去年差异' },
  { 'key': 'thisyearsummary', 'name': '今年累计' }, { 'key': 'lastyearsummary', 'name': '去年累计' }]

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
      shows: showOptions,
      firstshow: true,
      showcols: ['plan', 'actual', 'diff', 'lastyear', 'lastyeardiff', 'thisyearsummary', 'lastyearsummary'],
      loading: false,
      downloading: false
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
      // } else {
      //   console.log(row.itemname + '-' + row.type + '-' + row.typeclass)
      //   if (row.typeclass === 'plan') {
      //     console.log(row.itemname)
      //     style = 'hide'
      //   }
      }

      return style
    },
    handleDownload() {
      this.downloading = true
      // require.ensure([], () => {
      //   // const { export_json_to_excel } = require('@/vendor/Export2Excel')
      //   // const tHeader = ['日期', '姓名', '地址']
      //   // const filterVal = ['itemid', 'planamount1', 'actualamount1']
      //   // const list = this.tableData
      //   // const data = this.formatJson(filterVal, list)
      //   // export_json_to_excel(tHeader, data, '利润报表')
      //   const { export_table_to_excel } = require('@/vendor/Export2Excel')
      //   export_table_to_excel(id)
      //   this.downloading = false
      // })
      // const wb = XLSX.utils.table_to_book(document.querySelector('#datatable'))
      /* get binary string as output */
      // const wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
      // 判断要导出的节点中是否有fixed的表格，如果有，转换excel时先将该dom移除，然后append回去，
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
    getData: function() {
      // check input
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
.textright{ text-align: right}
.inlinelable {position:relative;font-size:14px;display:inline-block;margin:0px}
.finprofilereport{height:100%}
.el-card >>> .el-card__body {height:100%}
.el-card{height:100%}

/* .hide {background: #f99} */
</style>
