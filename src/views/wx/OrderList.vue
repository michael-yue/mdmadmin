<template>
  <div class="orderlist">
    <el-card style="margin:20px">
      <SelectBranch @BranchChanged="branchChangeEvent"/>
      <el-date-picker v-model="selectedDate" type="date" size="small" placeholder="选择日期" style="width:140px"/>
      <el-button type="primary" size="small" style="margin-left:20px" @click="retrieveData" >查询</el-button>
    </el-card>
    <el-card style="margin:20px">
      <el-table :data="orders" :class="{'tablestyle': true}" :cell-class-name="getCellClass" :expand-row-keys="expands" :row-key="getRowKeys" height="750" border size="small" @row-click="rowClick">
        <el-table-column fixed prop="ordertime" label="时间" width="200" header-align="center" label-class-name	="header" align="left" />
        <el-table-column fixed prop="tableid" label="桌号" width="200" header-align="center" align="right" />
        <el-table-column fixed prop="amount" label="金额" width="200" header-align="center" align="right" />
        <el-table-column type="expand" prop="children" label="ss">
          <OrderItems :item_data="itemData"/>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { parseTime } from '@/utils'
import { listOrder } from '@/api/wxorder'
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
      itemData: []
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
      const qdate = parseTime(this.selectedDate, '{y}-{m}-{d}')
      listOrder(this.selectedBranch, qdate).then(response => {
        this.orders = response.data
      }).catch(error => {
        console.log(error)
      })
    },
    rowClick: function(row, event, column) {
      // Array.prototype.remove = function(val) {
      //   const index = this.indexOf(val)
      //   if (index > -1) {
      //     this.splice(index, 1)
      //   }
      // }

      // if (this.expands.indexOf(row.id) < 0) {
      //   this.expands.push(row.id)
      // } else {
      //   this.expands.remove(row.id)
      // }
      console.log(row.id)
    },
    getRowKeys: function(row) {
      return row.id
    },
    resend: function(billid) {
      console.log(billid)
    },
    getCellClass: function(event) {
      console.log('sss')
    }
  }
}
</script>

<style scoped>
ul {list-style: none}
ul>li{display:flex; font-size:14px; color:#301333; justify-content: flex-start;}
.time, .amount, .tableid, .buttons{flex: 1 1 auto}

body .el-table th.gutter{
    display: table-cell!important;
}
.tablestyle{margin:0px;}
.header{background: #00f0f0}
</style>
