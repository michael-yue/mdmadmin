<template>
  <div class="orderlist">
    <div ref="critheader" style="padding:10px 20px">
      <el-card>
        <SelectBranch typeclass="wx" @BranchChanged="branchChangeEvent"/>
        <el-date-picker v-model="selectedDate" type="date" size="small" placeholder="选择日期" style="width:140px"/>
        <el-button type="primary" plain size="small" style="margin-left:20px" @click="retrieveData" >查询</el-button>
      </el-card>
      <div ref="statdiv" class="stat" style="padding:10px ">
        <div>笔数：{{ totalcount }} </div>
        <div>合计金额：{{ totalamount }}</div>
      </div>
    </div>
    <div :style="{height: myHeight}" style="padding:0 20px 10px 20px;">
      <el-table
        v-loading="loading"
        ref="refTable"
        :data="orders"
        :class="{'tablestyle': true}"
        :header-cell-style="tableheader"
        size="small"
        height="100%">
        <el-table-column prop="orderdatetime" label="时间" width="" header-align="left" align="left" >
          <template slot-scope="props">
            <div>{{ props.row.orderdatetime.time | formatDate }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="tableid" label="台号" width="" header-align="left" align="right" />
        <el-table-column prop="totalamount" label="总金额" width="" header-align="right" label-class-name	="header" align="right" />
        <el-table-column prop="payedamount" label="付款金额" width="" header-align="right" align="right" />
        <el-table-column prop="refundAmount" label="退款金额" width="" header-align="right" align="right" />
        <el-table-column prop="billid" label="操作" width="" header-align="right" align="right" >
          <template slot-scope="props">
            <div style="display:flex;justify-content:flex-end">
              <el-button type="primary" size="small" @click="showDetail(props.row)">详细</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top:10px; text-align: right">
        <el-pagination
          :current-page="currentPage"
          :page-size="limit"
          :total="totalcount"
          layout="total, sizes, prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="pagechange" />
      </div>
    </div>
    <el-dialog
      :visible.sync="dialogDetail"
      :fullscreen="false"
      :modal="true"
      :show-close="false"
      :loading="refundloading"
      title="订单详细信息"
      width="80%"
      top="5vh">
      <div v-modal="order">
        <el-main>
          <div class="lineinfo">
            <div class="label">订单编号：</div>
            <div class="value">{{ order.billid }}</div>
          </div>
          <div class="lineinfo">
            <div class="label">点餐时间：</div>
            <div class="value">{{ order.orderdatetime.time | formatDate }}</div>
          </div>
          <div class="lineinfo">
            <div class="label">桌台：</div>
            <div class="value">第{{ order.tableid }}台</div>
          </div>
          <div class="lineinfo">
            <div class="label">总金额：</div>
            <div class="value">{{ order.totalamount }}</div>
          </div>
          <div class="lineinfo">
            <div class="label">收款金额：</div>
            <div class="value">{{ order.payedamount }}</div>
          </div>
          <div class="lineinfo">
            <div class="label">微信支付号：</div>
            <div class="value">{{ order.wxTransactionId }}</div>
          </div>
        </el-main>
        <el-table
          v-loading="loading"
          ref="refTable"
          :data="order.lines"
          :class="{'tablestyle': true}"
          :header-cell-style="tableheader"
          size="small"
          height="100%">
          <el-table-column prop="prodid" label="代码" width="80" header-align="left" align="left" />
          <el-table-column prop="prodname" label="产品" width="" header-align="left" align="left" />
          <el-table-column prop="zf" label="做法要求" width="" header-align="left" label-class-name	="header" align="left" />
          <el-table-column prop="qty" label="数量" width="80" header-align="right" align="right" />
          <el-table-column prop="refundQty" label="已退数量" width="100" header-align="right" align="right" />
          <el-table-column prop="refundqty" label="退单数量" width="" header-align="right" align="right">
            <template slot-scope="props">
              <div style="display:flex;justify-content:flex-end">
                <el-input-number v-model="props.row.refundnum" :min="0" :max="props.row.qty - props.row.refundQty" size="small" label="退单数量" @change="handleRefundQtyChange" />
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="prodid" label="操作" width="" header-align="right" align="right" >
            <template slot-scope="props">
              <div style="display:flex;justify-content:flex-end">
                <el-button type="danger" size="small" @click="refund(order.id, props.row)">退单</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="closeDialog">关  闭</el-button>
        <el-button size="medium" type="primary" @click="closeDialog">重  发</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { parseTime } from '@/utils'
import { listWxOrderPage, resendOrder, wxRefund } from '@/api/wxorder'
import store from '@/store'
import SelectBranch from '@/components/widgets/SelectBranch'
import OrderItems from '@/components/widgets/OrderItems'

export default {
  name: 'OrderList',
  components: {
    SelectBranch,
    OrderItems
  },
  filters: {
    formatDate(time) {
      const date = new Date(time)
      return parseTime(date, '{h}:{i}')
    }
  },
  data() {
    return {
      dialogDetail: false,
      selectedBranch: '',
      selectedDate: '',
      orders: [],
      order: {
        orderdatetime: {
          time: ''
        }
      },
      totalcount: 0,
      totalamount: 0,
      limit: 10,
      currentPage: 1,
      myHeight: '',
      loading: false,
      refundloading: false
    }
  },
  mounted() {
    const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight // 浏览器高度
    const critheaderheight = this.$refs.critheader.offsetHeight
    // const statHeight = this.$refs.statdiv.offsetHeight
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
      if (this.selectedBranch === '') {
        this.$message({
          message: '请先选择门店',
          type: 'warning'
        })
        return
      }
      if (this.selectedDate === '') {
        this.$message({
          message: '请先选择日期',
          type: 'warning'
        })
        return
      }
      const qdate = parseTime(this.selectedDate, '{y}-{m}-{d}')
      this.loading = true
      listWxOrderPage(this.selectedBranch, qdate, this.limit, this.currentPage).then(response => {
        this.orders = response.data
        this.totalcount = response.totalcount
        this.totalamount = response.totalamount
        this.loading = false
      }).catch(error => {
        console.log(error)
      })
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
      }).catch(error => {asz67
        console.log(error)
      })
    },
    refund: function(orderid, row) {
      if (row.refundnum === '') {
        return
      }
      const refundnum = Number(row.refundnum)
      this.refundloading = true
      wxRefund(this.selectedBranch, orderid, row.prodid, row.zf, row.refundnum).then(response => {
        console.log(response.code)
        console.log(response.data)
        this.refundloading = false
        this.dialogDetail = false
        this.retrieveData()
      }).catch(error => {
        console.log(error)
      })
    },
    handleRefundQtyChange: function(value) {
      console.log(value)
    },
    showDetail: function(bill) {
      console.log(bill)
      this.order = bill
      this.dialogDetail = true
    },
    closeDialog: function() {
      this.dialogDetail = false
    },
    // 分页处理
    pagechange: function(currentPage) {
      this.currentPage = currentPage
      this.retrieveData()
    },
    handleSizeChange: function(currentSize) {
      this.limit = currentSize
      this.retrieveData()
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
.stat {width:100%;padding-bottom:10px;font-size:14px;color:#606266; display: flex; justify-content: space-between}
 .lineinfo{display: flex; margin: 5px 0px}
 .lineinfo .label {flex: 0 0 30%; text-align:right; padding:0px 20px}
 .lineinfo .value {flex: 0 0 70%; flex-grow: 1}

 .lineprods {display: flex}
 .lineprods .prodid{ flex: 0 0 20%}
 .lineprods .prodname{ flex: 0 0 80%}
 .lineprods .prodzf{ flex: 0 0 100%}
</style>
