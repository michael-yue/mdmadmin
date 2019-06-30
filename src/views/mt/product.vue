<template>
  <div class="product">
    <div ref="critheader" style="padding:10px 20px">
      <el-card>
        <SelectBranch typeclass="mt" @BranchChanged="branchChangeEvent" />
      </el-card>
    </div>
    <el-card :style="{height: myHeight}">
      <div style="display:flex; flex-direction:row">
        <div class="left">
          <ul>
            <li v-for="type in producttypes" :key="type.name">{{ type.name }}</li>
          </ul>
        </div>
        <div class="right">
          <ul>
            <li v-for="product in products" :key="product.name">
              <div style="display:flex">
                <div style="flex: 0 0 30%">
                  <el-input v-model="product.app_food_code" placeholder="请输入内容"></el-input>
                </div>
                <div style="flex:1; margin:auto; padding-left:20px">
                  {{ product.name }} - {{product.category_name}}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import store from '@/store'
import SelectBranch from '@/components/widgets/SelectBranch'
import { listAllCatByBranch, listAllProductByBranch } from '@/api/mt.js'
export default {
  name: 'product',
  components: {
    SelectBranch
  },
  data () {
    return {
      myHeight: 0,
      selectedBranch: '',
      producttypes: [],
      products: []
    }
  },
  mounted() {
    const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight // 浏览器高度
    const critheaderheight = this.$refs.critheader.offsetHeight
    this.myHeight = (h - critheaderheight - 50) + 'px'
    var that = this
    window.onresize = function windowResize() {
      const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight // 浏览器高度
      that.myHeight = (h - critheaderheight - 50) + 'px'
    }
  },
  created: function() {
    if (store.getters.roles.includes('branch')) {
      this.selectedBranch = store.getters.branches
      this.roleBranch = true
    }
  },
  watch: {
    selectedBranch(val, oldval) {
      if (val !== 0) {
        this.retriveData()
      }
    }
  },
  methods: {
    branchChangeEvent: function(event) {
      this.selectedBranch = event.branchId
    },
    listAllCat: function (callback) {
      var that = this
      listAllCatByBranch(this.selectedBranch).then(response => {
        that.producttypes = response.data
        that.loading = false
        callback()
      }).catch(error => {
        console.log(error)
      })
    },
    listAllProduct: function () {
      var that = this
      listAllProductByBranch(this.selectedBranch).then(response => {
        that.products = response.data
        that.loading = false
      }).catch(error => {
        console.log(error)
      })
    },
    retriveData: function () {
      this.listAllCat(this.listAllProduct())
    }
  }
}
</script>

<style scoped>
.left { flex: 0 0 20%; border-right: 1px solid #f3f3f3}
.left ul li{ padding: 10px 5px}

.right {flex: 1; padding:0 10px}
.right ul li{padding:10px}
.right ul li::first{padding-top:0}
</style>
