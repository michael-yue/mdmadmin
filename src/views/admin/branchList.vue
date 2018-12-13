<template>
  <div class="cardlist">
    <div ref="critheader" style="padding:10px 20px" />
    <div :style="{height: myHeight}" style="padding:0 20px 10px 20px;">
      <el-table
        v-loading="loading"
        ref="refTable"
        :data="tableData"
        :class="{'tablestyle': true}"
        :header-cell-style="tableheader"
        border
        size="small"
        height="100%">
        <el-table-column prop="branchid" label="门店编码" width="" header-align="center" align="right" />
        <el-table-column prop="branchname" label="门店名称" width="" header-align="center" align="left" />
        <el-table-column prop="code" label="门店编码" width="" header-align="center" align="left" />
        <el-table-column prop="wxtype" label="微信点餐" width="" header-align="center" label-class-name	="header" align="left" />
        <el-table-column prop="mttype" label="是否接入美团" width="" header-align="center" align="right" />
      </el-table>
      <vpagination :total="total" :display="limit" :current-page="current" @pagechange="pagechange" />
    </div>
  </div>
</template>

<script>
import vpagination from '@/components/widgets/Pagination'
import { getPOSBranch } from '@/api/branch.js'

export default {
  name: 'BranchList',
  components: {
    vpagination
  },
  data() {
    return {
      myHeight: '',
      loading: false,
      // 表格变量
      tableData: [],
      total: 0,
      limit: 15,
      current: 1
      // flag: false
    }
  },
  mounted() {
    const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight // 浏览器高度
    const critheaderheight = this.$refs.critheader.offsetHeight
    // const statHeight = this.$refs.critheader.offsetHeight
    this.myHeight = (h - critheaderheight - 100) + 'px'
    var that = this
    window.onresize = function windowResize() {
      const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight // 浏览器高度
      that.myHeight = (h - critheaderheight - 100) + 'px'
    }
  },
  created: function() {
    this.retrieve()
  },
  methods: {
    retrieve: function() {
      this.loading = true
      getPOSBranch().then(response => {
        this.tableData = response.data.cards
        this.total = response.data.totalnum
        this.loading = false
      }).catch(error => {
        console.log(error)
      })
    },
    tableheader({ row, index }) {
      return 'background:#DCDFE6;'
    },
    // 分页处理
    pagechange: function(currentPage) {
      // retrieveData(currentPage)
      getPOSBranch().then(response => {
        this.tableData = response.data.cards
        this.total = response.data.totalnum
        this.loading = false
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
