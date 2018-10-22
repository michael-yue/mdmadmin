<template>
  <div class="orderlist">
    <div ref="critheader" style="padding:10px 20px">
      <el-card>
        <SelectBranch typeclass="wx" @BranchChanged="branchChangeEvent"/>
        <el-date-picker v-model="selectedDate" type="date" size="small" placeholder="选择日期" style="width:140px"/>
        <el-button type="primary" plain size="small" style="margin-left:20px" @click="retrieveData" >查询</el-button>
      </el-card>
    </div>
    <div :style="{height: myHeight}" style="padding:0 20px 10px 20px;">
      <div ref="statdiv" class="stat">笔数：{{ totalcount }} 合计金额：{{ totalamount }}</div>
      <el-table
        v-loading="loading"
        ref="refTable"
        :data="orders"
        :class="{'tablestyle': true}"
        :header-cell-style="tableheader"
        :row-key="getRowKeys"
        border
        size="small"
        height="100%"
        @row-click="rowClick">
        <el-table-column prop="ordertime" label="时间" width="" header-align="center" label-class-name	="header" align="left" />
        <el-table-column prop="tableid" label="桌号" width="" header-align="center" align="right" />
        <el-table-column prop="amount" label="金额" width="" header-align="center" align="right" />
        <el-table-column prop="revflag" label="接收状态" width="" header-align="center" align="right">
          <template slot-scope="props">
            <div v-if="props.row.revflag=='1'">已收</div>
            <div v-else>未收</div>
          </template>
        </el-table-column>
        <el-table-column type="expand" prop="itemData" label="操作">
          <template slot-scope="scope">
            <div style="display:flex; flex-direction:column">
              <OrderItems :item_data="scope.row.itemData" />
              <div style="text-align:right">
                <el-button type="danger" size="mini" class="resend" @click="resend(scope.$index, scope.row)" >重发</el-button>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { parseTime } from '@/utils'
import { listWxOrder, resendOrder } from '@/api/wxorder'
import store from '@/store'
import SelectBranch from '@/components/widgets/SelectBranch'
import OrderItems from '@/components/widgets/OrderItems'

export default {
  name: 'OrderList',
  components: {
    SelectBranch,
    OrderItems
  },
  data() {
    return {
      selectedBranch: '',
      selectedDate: '',
      orders: [],
      itemData: [],
      myHeight: '',
      loading: false
    }
  },
  computed: {
    totalcount: function() {
      return this.orders.length
    },
    totalamount: function() {
      let total = 0
      for (var v of this.orders) {
        total += v.amount
      }
      return total
    }
  },
  mounted() {
    const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight // 浏览器高度
    const critheaderheight = this.$refs.critheader.offsetHeight
    const statHeight = this.$refs.statdiv.offsetHeight
    this.myHeight = (h - critheaderheight - statHeight - 50) + 'px'
    var that = this
    window.onresize = function windowResize() {
      const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight // 浏览器高度
      that.myHeight = (h - critheaderheight - statHeight - 50) + 'px'
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
      if (this.selectedBranch === '') {
        this.$message({
          message: '请先选择门店',
          type: 'warning'
        })
        return
      }
      console.log(this.selectedDate)
      if (this.selectedDate === '') {
        this.$message({
          message: '请先选择日期',
          type: 'warning'
        })
        return
      }
      const qdate = parseTime(this.selectedDate, '{y}-{m}-{d}')
      this.loading = true
      listWxOrder(this.selectedBranch, qdate).then(response => {
        this.orders = response.data
        this.loading = false
      }).catch(error => {
        console.log(error)
      })
    },
    rowClick: function(row, event, column) {
      this.$refs.refTable.toggleRowExpansion(row)
    },
    getRowKeys: function(row) {
      return row.billid
    },
    resend: function(index, row) {
      resendOrder(row.billid).then(response => {
        // message
        if (response.code === 20000) {
          this.$message({
            message: '重发成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: '重发错误，原因' + response.data,
            type: 'danger'
          })
        }
      }).catch(error => {
        console.log(error)
      })
    },
    /*
    * 以下设置class
    */
    tableheader({ row, index }) {
      return 'background:#DCDFE6;'
    }
  }
}
</script>

<style scoped>
.time, .amount, .tableid, .buttons{flex: 1 1 auto}

body .el-table th.gutter{
    display: table-cell!important;
}
.tablestyle{margin:0px;}
.header{background: #00f0f0}
.stat {width:100%;padding-bottom:10px;font-size:14px;color:#606266}
</style>
