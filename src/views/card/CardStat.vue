<template>
  <div class="cardlist">
    <div ref="critheader" style="padding:10px 20px">
      <el-card>
        <span style="font-size:14px">开卡日期：</span>
        <el-date-picker
          v-model="dateRange"
          :default-time="['00:00:00', '23:59:59']"
          :picker-options="pickerOptions"
          type="daterange"
          format="yyyy 年 MM 月 dd 日"
          size="small"
          start-placeholder="开始日期"
          end-placeholder="结束日期" />
        <el-button type="primary" plain size="small" style="margin-left:20px" @click="querystart" >查询</el-button>
      </el-card>
    </div>
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
        <el-table-column prop="customerid" label="会员卡号" width="" header-align="center" align="right" />
        <el-table-column prop="customername" label="会员卡号" width="" header-align="center" align="right" />
        <el-table-column prop="registdate" label="开卡时间" width="" header-align="center" label-class-name	="header" align="left" />
        <el-table-column prop="balance" label="余额" width="" header-align="center" align="right" />
        <el-table-column prop="balance" label="充值金额" width="" header-align="center" align="right" />
        <el-table-column prop="status" label="状态" width="" header-align="center" align="right" />
      </el-table>
      <vpagination :total="total" :display="limit" :current-page="current" @pagechange="pagechange" />
    </div>
  </div>
</template>

<script>
import store from '@/store'
import vpagination from '@/components/widgets/Pagination'
import { listAll } from '@/api/card.js'

export default {
  name: 'CardList',
  components: {
    vpagination
  },
  data() {
    return {
      myHeight: '',
      loading: false,
      dateRange: [],
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
    if (store.getters.roles.includes('branch')) {
      this.selectedBranch = store.getters.branches
    }
  },
  methods: {
    retrieve: function(currentPage) {
      this.loading = true
      listAll(this.selectedBranch, currentPage, this.limit).then(response => {
        this.tableData = response.data.cards
        this.total = response.data.totalnum
        this.loading = false
      }).catch(error => {
        console.log(error)
      })
    },
    querystart: function() {
      this.retrieve(1)
    },
    tableheader({ row, index }) {
      return 'background:#DCDFE6;'
    },
    // 分页处理
    pagechange: function(currentPage) {
      this.retrieve(currentPage)
    }
  }
}
</script>
