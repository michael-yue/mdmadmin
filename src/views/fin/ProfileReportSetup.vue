<template>
  <div class="finprofilereportmaintain">
    <!-- <div ref="critheader" style="padding:20px">
      <el-card style="text-align:right">
        <el-button size="small" type="primary" @click="saveData">保存</el-button>
      </el-card>
    </div> -->
    <div :style="{height: myHeight}" style="padding:0 20px 10px 20px;">
      <el-card>
        <el-table
          v-loading="loading"
          :data="itemdata"
          :cell-class-name="getCellClass"
          :header-cell-style="tableheader"
          border
          size="small"
          height="100%" >
          <el-table-column fixed prop="itemid" label="项目编号" width="" header-align="center" align="left" />
          <el-table-column prop="itemname" label="项目名称" width="" header-align="center" align="left" />
          <el-table-column prop="itemlevel" label="级别" width="" header-align="center" align="right" />
          <el-table-column prop="itemtype" label="类型" width="" header-align="center" align="right">
            <template slot-scope="props">
              <div v-if="props.row.itemtype === '1'">输入项目</div>
              <div v-else>计算项目</div>
            </template>
          </el-table-column>
          <el-table-column prop="formula" label="公式" width="" header-align="center" align="left" />
          <el-table-column prop="percentformula" label="百分比公式" width="150" header-align="center" align="left" />
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getProfileReportItems } from '@/api/finreport'

export default {
  name: 'FinProfileReportSetup',
  data() {
    return {
      itemdata: [],
      myHeight: '',
      active: false
    }
  },
  mounted() {
    // set content height
    const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight // 浏览器高度
    // const critheaderheight = this.$refs.critheader.offsetHeight
    this.myHeight = (h - 50) + 'px'
    var that = this
    window.onresize = function windowResize() {
      const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight // 浏览器高度
      that.myHeight = (h - 50) + 'px'
    }
  },
  created: function() {
    // this.getData()
    // var test1 = '1+((2-3)*5+10)/3'
    // var result1 = calc(test1)
    // console.log(test1 + ' = ' + result1)
    this.getData()
  },
  methods: {
    getData() {
      var that = this
      getProfileReportItems().then(response => {
        that.itemdata = response.data
      }).catch(error => {
        console.log(error)
      })
    },
    // 保存数据
    saveData() {
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
      if (columnIndex === 1) {
        if (row.itemlevel !== '0') {
          style = style + ' indent' + row.itemlevel
        }
      }
      return style
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

