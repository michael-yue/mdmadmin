<template>
  <div class="orderlist">
    <div style="margin:20px">
      <ul class="">
        <li v-for="item in orders" :key="item.orderid">
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
export default {
  name: 'SalesReport',
  data() {
    return {
      selectedBranch: '',
      branches: [],
      orders: []
    }
  }
}
</script>
