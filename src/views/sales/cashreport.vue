<template>
  <div class="orderlist">
    <el-card style="margin:20px">
      <SelectBranch />
      <el-button size="small">今日</el-button>
      <el-button size="small">昨日</el-button>
      <el-button size="small">本期</el-button>
      <el-button size="small">上期</el-button>
    </el-card>
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
import SelectBranch from '@/components/widgets/SelectBranch'

export default {
  name: 'CashReport',
  components: {
    SelectBranch
  },
  data() {
    return {
      selectedBranch: '',
      branches: [],
      orders: []
    }
  }
}
</script>
