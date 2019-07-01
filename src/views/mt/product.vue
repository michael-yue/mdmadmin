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
            <li v-for="type in producttypes" :key="type.name" :class="{active: activeProductType == type}" @click="productTypeselected(type)">{{ type.name }}</li>
          </ul>
        </div>
        <div class="right">
          <ul>
            <li v-for="product in filteredProducts" :key="product.name">
              <div style="display:flex">
                <div style="flex: 0 0 30%">
                  <el-input v-model="product.app_food_code" placeholder="请输入收银代码" size="small" @keyup.enter.native="updateCode(product)"></el-input>
                </div>
                <div style="flex:1; margin:auto; padding-left:20px; display:flex; justify-content:space-between">
                  <span>{{ product.name }}</span>  
                  <span>¥{{product.price}}</span>
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
import { listAllCatByBranch, listAllProductByBranch, updateFoodCode } from '@/api/mt.js'
export default {
  name: 'product',
  components: {
    SelectBranch
  },
  data () {
    return {
      loading: false,
      myHeight: 0,
      selectedBranch: '',
      producttypes: [],
      products: [],
      activeProductType: {},
      filteredProducts: []
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
  computed: {
    // filteredProducts: function () {
    //   return this.products.filter(function (item) {
    //     return item.category_name === this.activeProductType.name
    //   });
    // }
  },
  watch: {
    selectedBranch(val, oldval) {
      if (val !== 0) {
        this.retriveData()
      }
    },
    activeProductType(val, oldval) {
      this.filteredProducts = this.products.filter(function (item) {
        return item.category_name === val.name
      })
    }
  },
  methods: {
    branchChangeEvent: function(event) {
      this.selectedBranch = event.branchId
    },
    listAllCat: function () {
      var that = this
      listAllCatByBranch(this.selectedBranch).then(response => {
        that.producttypes = response.data
        if (that.producttypes.length > 0) {
          that.activeProductType = that.producttypes[0]
        }
        that.loading = false
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
      var that = this
      listAllCatByBranch(this.selectedBranch).then(response => {
        that.producttypes = response.data
        if (that.producttypes.length > 0) {
          that.activeProductType = that.producttypes[0]
          console.log(that.activeProductType)
        }
        listAllProductByBranch(this.selectedBranch).then(response => {
          that.products = response.data
          that.filteredProducts = that.products.filter(function (item) {
            return item.category_name === that.activeProductType.name
          })
          that.loading = false
        }).catch(error => {
          console.log(error)
        })
        that.loading = false
      }).catch(error => {
        console.log(error)
      })
    },
    updateCode: function (product) {
      this.loading = true
      var that = this
      updateFoodCode(this.selectedBranch, product.name, product.category_name, product.app_food_code)
        .then(response => {
          that.products = response.data
          that.filteredProducts = that.products.filter(function (item) {
            return item.category_name === that.activeProductType.name
          })
          that.loading = false
        }).catch(error => {
          console.log(error)
        })
    },
    productTypeselected: function (item) {
      this.activeProductType = item
    }
  }
}
</script>

<style scoped>
.left { flex: 0 0 20%; border-right: 1px solid #f3f3f3}
.left ul li{ padding: 10px 5px; font-size: 13px}
.left ul li.active{ color: #800008}

.right {flex: 1; padding:0 10px; font-size: 13px}
.right ul li{padding:10px}
.right ul li::first{padding-top:0}
</style>
