<template>
  <div class="UpdateWxProduct">
    <div class="header">
      <SelectBranch @BranchChanged="branchChangeEvent" />
    </div>
    <div style="margin:20px">
      <ul class="prodlist">
        <li v-for="item in products" :key="item.productid">
          <div class="namecontents">
            <div class="id textleft">{{ item.productid }}</div>
            <div class="name textleft">{{ item.name }}</div>
            <div class="buttons textright">
              <el-button v-show="item.onsale === '0'" type="danger" size="small" @click="updatetrue(item.productid)" >上架</el-button>
              <el-button v-show="item.onsale === '1'" type="success" size="small" @click="updatefalse(item.productid)" >下架</el-button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { listProductByBranch, updateWxProductOnsale } from '@/api/wxproduct'
import SelectBranch from '@/components/widgets/SelectBranch'

export default {
  name: 'UpdateWxProduct',
  components: {
    SelectBranch
  },
  data() {
    return {
      selectedBranch: '',
      products: []
    }
  },
  watch: {
    selectedBranch(val, oldval) {
      console.log(val, oldval)
      if (val !== 0) {
        this.retriveData()
      }
    }
  },
  created: function() {
  },
  methods: {
    retriveData: function() {
      var that = this
      if (this.selectedBranch !== 0) {
        listProductByBranch(this.selectedBranch).then(response => {
          that.products = response.data
        }).catch(error => {
          console.log(error)
        })
      }
    },
    branchChangeEvent: function(event) {
      this.selectedBranch = event.branchId
    },
    updatetrue: function(productid) {
      this.update(productid, 1)
    },
    updatefalse: function(productid) {
      this.update(productid, 0)
    },
    update: function(productid, flag) {
      var that = this
      updateWxProductOnsale(that.selectedBranch, productid, flag).then(response => {
        that.retriveData()
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
<style scoped>
ul.prodlist{
  list-style-type: none;
  margin: 5px;
  padding: 0px 0px;
  display: block;
}
ul.prodlist>li {
  width: 100%;
  padding-left: 0px;
  border-bottom: solid 1px #ebebeb;
  justify-content: center;
}
ul.prodlist>li:first{
  border-top: solid 1px #ebebeb;
}
.namecontents{width:100%; display: inline-flex;padding: 5px 0px}
.id{flex-grow: 1;flex-shrink: 1;flex-basis: 0; }
.buttons{flex-grow: 3;flex-shrink: 1;flex-basis: 0;}
.name{flex-grow: 4;flex-shrink: 1;flex-basis: 0;}
.textleft{text-align:left}
.textright{text-align:right}
.header{width:100%;padding:5px;margin:0;display: flex; background: #f2f2f2}

</style>
