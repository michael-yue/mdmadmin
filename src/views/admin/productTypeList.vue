<template>
  <div class="productlist">
    <div ref="critheader" style="padding:10px 20px">
      <el-card>
        <el-date-picker v-model="selectedDate" type="date" size="small" placeholder="选择日期" style="width:140px"/>
        <el-button type="primary" plain size="small" style="margin-left:20px" @click="retrieveData" >查询</el-button>
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
        <el-table-column prop="photo" label="图片" width="" header-align="center" align="right" >
          <template slot-scope="props">
            <!-- <img src="{{ props.row.photo }}" /> -->
            {{ props.row.photo }}
          </template>
        </el-table-column>
        <el-table-column prop="productid" label="产品编码" width="" header-align="center" align="left" />
        <el-table-column prop="name" label="产品名称" width="" header-align="center" align="left" />
        <el-table-column prop="type" label="产品类别" width="" header-align="center" label-class-name	="header" align="left" />
        <el-table-column prop="price" label="单价" width="" header-align="center" align="right" />
      </el-table>
      <vpagination :total="total" :display="limit" :current-page="current" @pagechange="pagechange" />
    </div>
  </div>
</template>

<script>
import vpagination from '@/components/widgets/Pagination'
import { listProduct } from '@/api/product.js'

export default {
  name: 'ProductList',
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
    this.retrieve(1)
  },
  methods: {
    retrieve: function(currentPage) {
      this.loading = true
      listProduct(currentPage, this.limit).then(response => {
        this.tableData = response.data.products
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
      // retrieveData(currentPage)
      listProduct(currentPage, this.limit).then(response => {
        this.tableData = response.data.products
        this.total = response.data.totalnum
        this.loading = false
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
