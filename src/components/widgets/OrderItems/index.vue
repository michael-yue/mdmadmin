<template>
  <div class="itemcontent">
    <div>child table </div>
    <div v-for="item in itemData" :key="item.linenumber" class="items">
      <div class="name">{{ item.productName }}</div>
      <div class="qty">{{ item.qty }}</div>
    </div>
    <el-button type="danger" size="mini" @click="resend()">重发</el-button>
  </div>
</template>

<script>

export default {
  name: 'OrderItems',
  props: {
    itemData: {
      default: function() {
        return []
      },
      type: Array
    }
  },
  data() {
    return {
      s: ''
    }
  },
  created: function() {
    console.log('created')
    console.log(this.itemData)
  },
  method: {
    retriveItems: function() {
      console.log(this.orderId)
    },
    resend: function() {
      console.log('send back')
    }
  }
}
</script>

<style scope>
div.items{display:flex}
</style>
