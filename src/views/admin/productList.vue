<template>
  <div class="UpdateWxProduct">
    <div v-show="!roleBranch" ref="critheader" style="padding:10px 20px ">
      <el-card>
        <SelectBranch typeclass="wx" @BranchChanged="branchChangeEvent" />
      </el-card>
    </div>
    <div :style="{height: myHeight}" class="contentwrapper">
      <el-card>
        <div v-loading="loading" style="height:100%">
          <ul >
            <li v-for="item in products" :key="item.prodtypeid">
              <h4>{{ item.prodtypename }}</h4>
              <ul class="productcontainer">
                <li v-for="p in item.products" :key="p.productid">
                  <div :class="{'product_content_sale':p.onsale==='1', 'product_content':p.onsale==='0'}" @click="update(p.productid, p.onsale)">
                    <div style="padding-bottom:10px">{{ p.productid }}</div>
                    <div style="padding-bottom:10px"> {{ p.name }}</div>
                    <div style="width:100%;text-align:right"> ￥{{ p.price }}</div>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import { listProduct, updateProduct } from '@/api/product'

export default {
  name: 'UpdateWxProduct',
  components: {
    SelectBranch
  },
  data() {
    return {
      loading: false,
      roleBranch: false,
      selectedBranch: '',
      products: [],
      myHeight: ''
    }
  },
  watch: {
    selectedBranch(val, oldval) {
      if (val !== 0) {
        this.retriveData()
      }
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
  methods: {
    retriveData: function() {
      if (this.selectedBranch === '') {
        return
      }
      var that = this
      this.loading = true
      if (this.selectedBranch !== '') {
        listProductByBranch(this.selectedBranch).then(response => {
          that.products = response.data
          that.loading = false
        }).catch(error => {
          console.log(error)
        })
      }
    },
    branchChangeEvent: function(event) {
      this.selectedBranch = event.branchId
    },
    update: function(productid, flag) {
      if (this.selectedBranch === '') {
        return
      }
      var that = this
      this.loading = true
      if (flag === '1') {
        flag = '0'
      } else {
        flag = '1'
      }
      updateWxProductOnsale(that.selectedBranch, productid, flag).then(response => {
        that.retriveData()
        that.loading = false
      }).catch(error => {
        console.log(error)  
      })
    }
  }
}
</script>

<style scoped>
.namecontents{width:100%; display: inline-flex;padding: 5px 0px; justify-content: center;align-items:center}
.id{flex-grow: 1;flex-shrink: 1;flex-basis: 0; font-size:14px; color:#303133}
.buttons{flex-grow: 3;flex-shrink: 1;flex-basis: 0; }
.name{flex-grow: 4;flex-shrink: 1;flex-basis: 0; font-size:14px; color:#303133}
.textleft{text-align:left}
.textright{text-align:right}
.header{width:100%;padding:5px;margin:0;display: flex; background: #f2f2f2}
/* .el-card >>> .el-card__body {height:100%}
.el-card{height:100%} */
.product_content_sale{width:160px;height:80px; border:1px solid #eee;padding:10px 5px; background: lightgreen;cursor:-webkit-grab}
.product_content{width:160px;height:80px; border:1px solid #eee;padding:10px 5px; background: lightblue;cursor:-webkit-grab}

div.product_content_sale:hover, div.product_content:hover{cursor:-webkit-grab;
	  display: block;
    color: #a00; font-size:14px;
    -webkit-box-shadow: 0 10px 6px -6px #777;
    -moz-box-shadow: 0 10px 6px -6px #777;
    box-shadow: 4px 6px 12px 2px #777;}

ul.productcontainer{display:flex;margin:15px;flex-wrap:wrap;font-size:13px}
ul.productcontainer li{flex:0 1 auto;margin:10px}
@media screen and (max-device-width: 420px) {
  ul.productcontainer{display:flex;margin:5px 10px;flex-wrap:wrap;font-size:13px; justify-content: space-between}
  ul.productcontainer li{flex:0 1 auto;margin:5px}
}
</style>
