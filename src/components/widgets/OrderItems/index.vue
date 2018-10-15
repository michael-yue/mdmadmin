<template>
  <div class="itemcontent">
    <ul class="items">
      <li v-for="item in itemData" :key="item.linenumber" class="item">
        <div class="prodname">{{ item.prodname }}</div>
        <div class="qty">{{ item.qty }}</div>
      </li>
    </ul>
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
    }
  }
}
</script>

<style scope>
.itemcontent {width: 100%}
ul.items{display:flex;flex-direction:column; list-style: none;padding:0}
.item{display:flex;width: 100%;padding:0;margin:0 0 15px 0}
.prodname {flex:1 1 200px}
.qty {flex:1 1 auto}
.resend{text-align: right}
</style>
