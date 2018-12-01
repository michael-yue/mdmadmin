<template>
  <div class="cardlist">
    <div ref="critheader" style="padding:10px 20px">
      <el-card>
        <SelectBranch typeclass="all" @BranchChanged="branchChangeEvent"/>
        <el-button type="primary" plain size="small" style="margin-left:20px" @click="retrieveData" >查询</el-button>
      </el-card>
    </div>
    <div :style="{height: myHeight}" style="padding:0 20px 10px 20px;">
      <el-table
        v-loading="loading"
        ref="refTable"
        :data="cards"
        :class="{'tablestyle': true}"
        :header-cell-style="tableheader"
        border
        size="small"
        height="100%">
        <el-table-column prop="customerid" label="会员卡号" width="" header-align="center" align="right" />
        <el-table-column prop="name" label="会员卡号" width="" header-align="center" align="right" />
        <el-table-column prop="registdate" label="开卡时间" width="" header-align="center" label-class-name	="header" align="left" />
        <el-table-column prop="balance" label="余额" width="" header-align="center" align="right" />
        <el-table-column prop="status" label="状态" width="" header-align="center" align="right" />
      </el-table>
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[1, 2, 3, 4]"
        :page-size="pageSize"
        :total="totalItems"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />
    </div>
  </div>
</template>

<script>
import store from '@/store'
import SelectBranch from '@/components/widgets/SelectBranch'
import { listAll } from '@/api/card.js'

export default {
  name: 'CardList',
  components: {
    SelectBranch
  },
  data() {
    return {
      selectedBranch: '',
      cards: [],
      myHeight: '',
      loading: false,
      // 表格变量
      tableDataName: '',
      tableDataEnd: [],
      currentPage: 4,
      pageSize: 2,
      totalItems: 0,
      filterTableDataEnd: [],
      flag: false
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
    if (store.getters.roles.includes('branch')) {
      this.selectedBranch = store.getters.branches
    }
  },
  methods: {
    branchChangeEvent: function(event) {
      this.selectedBranch = event.branchId
    },
    retrieveData: function() {
      this.loading = true
      listAll(this.selectedBranch).then(response => {
        this.cards = response.data
        this.loading = false
      }).catch(error => {
        console.log(error)
      })
    },
    tableheader({ row, index }) {
      return 'background:#DCDFE6;'
    },
    // 分页处理
    handleSizeChange(val) {
      console.log('每页 ${val} 条')
      this.pageSize = val
      this.handleCurrentChange(this.currentPage)
    },
    handleCurrentChange(val) {
      console.log('当前页: ${val}')
      this.currentPage = val
      // 需要判断是否检索
      if (!this.flag) {
        this.currentChangePage(this.tableDataEnd)
      } else {
        this.currentChangePage(this.filterTableDataEnd)
      }
    }, // 组件自带监控当前页码
    currentChangePage(list) {
      let from = (this.currentPage - 1) * this.pageSize
      const to = this.currentPage * this.pageSize
      this.tableDataEnd = []
      for (; from < to; from++) {
        if (list[from]) {
          this.tableDataEnd.push(list[from])
        }
      }
    }
  }
}
</script>
