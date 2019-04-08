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
    <el-main v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.3)"
         element-loading-text="图标正在加载中" :style="{height: myHeight}" style="padding:0">
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
        <el-table-column prop="recamount" label="收款" width="" header-align="center" align="right" />
        <el-table-column prop="revflag" label="接收状态" width="" header-align="center" align="right">
          <template slot-scope="props">
            <div v-if="props.row.revflag !=='1'">未收</div>
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
    </el-main>
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
      dialogDetail: false,
      selectedBranch: '',
      selectedDate: '',
      orders: [],
      order: {},
      pagesize: 10,
      pagenum: 1,
      myHeight: '',
      loading: false,
      activeName: ''
    }
  },
  computed: {
    totalcount: function() {
      return this.orders.length
    },
    totalamount: function() {
      let total = 0
      for (var v of this.orders) {
        total += v.recamount
      }
      return total
    }
  },
  mounted() {
    const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight // 浏览器高度
    const critheaderheight = this.$refs.critheader.offsetHeight
    const statHeight = this.$refs.statdiv.offsetHeight
    this.myHeight = (h - critheaderheight - statHeight - 20) + 'px'
    var that = this
    window.onresize = function windowResize() {
      const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight // 浏览器高度
      that.myHeight = (h - critheaderheight - statHeight - 20) + 'px'
    }
    this.scroll(this.orders)
  },
  created: function() {
    if (store.getters.roles.includes('branch')) {
      this.selectedBranch = store.getters.branches
    }
  },
  filters: {
    formatDate(time) {
      const date = new Date(time)
      return parseTime(date, '{h}:{i}')
    }
  },
  methods: {
    branchChangeEvent: function(event) {
      this.selectedBranch = event.branchId
    },
    scroll: function(orders) {
      let isLoading = false
      window.onscroll = () => {
        // 距离底部200px时加载一次
        const bottomOfWindow = document.documentElement.offsetHeight - document.documentElement.scrollTop - window.innerHeight <= 20
        if (bottomOfWindow && isLoading === false) {
          isLoading = true
          const qdate = parseTime(this.selectedDate, '{y}-{m}-{d}')
          this.pagenum = this.pagenum + 1
          console.log(this.pagenum)
          listWxOrder(this.selectedBranch, qdate, this.pagesize, this.pagenum).then(response => {
            for (var i = 0; i < this.pagesize; i++) {
              this.orders.push(response.data[i])
            }
            isLoading = false
          })
        }
      }
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
      listWxOrder(this.selectedBranch, qdate, this.pagesize, this.pagenum).then(response => {
        this.orders = response.data
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
      }).catch(error => {
        console.log(error)
      })
    },
    showDetail: function(bill) {
      console.log(bill)
      this.order = bill
      this.dialogDetail = true
    },
    closeDialog: function() {
      this.dialogDetail = false
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
.orderlist {height:100%;display:flex;flex-direction:column; margin:0px 10px;font-size:14px; border-bottom: solid 1px #f3f3f3;
 color:#606266 }

 .lineinfo{display: flex}
 .lineinfo .label {flex: 0 0 30%}
 .lineinfo .value {flex: 0 0 70%; flex-grow: 1}
 .lineprods {display: flex}
 .lineprods .prodid{ flex: 0 0 20%}
 .lineprods .prodname{ flex: 0 0 80%}
 .lineprods .prodzf{ flex: 0 0 100%}
</style>

<style scoped lang="scss">
.loading {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.8);
    p {
        padding: .15rem .15rem .2rem;
        color: #fff;
        font-size: .16rem;
    }
    img {
        width: .4rem;
        height: .4rem;
    }
}
</style>
