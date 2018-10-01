<template>
  <div class="orderlist">
    <div style="margin:20px">
      <ul class="">
        <li v-for="item in orderlist" :key="item.orderid">
          <div class="ordercontents">
            <div class="time textleft">{{ item.ordertime }}</div>
            <div class="tableid textleft">{{ item.tableid }}</div>
            <div class="amount textleft">{{ item.amount }}</div>
            <div class="buttons textright">
              <el-button v-show="item.onsale === '0'" type="danger" size="small" @click="updatetrue(item.productid)" >重发</el-button>
            </div>
          </div>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
import { listOrder } from '@/api/wxorder'
import { getWxBranch } from '@/api/wxproduct'

export default {
  name: 'OrderList',
  data() {
    return {
      selectedBranch: '',
      branches: [],
      orders: []
    }
  },
  created: function() {
    this.retriveWxBranch()
  },
  methods: {
    retriveWxBranch: function() {
      var that = this
      getWxBranch().then(response => {
        that.branches = response.data
      }).catch(error => {
        console.log(error)
      })
    },
    retrieveData: function() {
      listOrder().then(response => {
        this.orders = response.data
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
