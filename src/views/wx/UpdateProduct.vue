<template>
  <div class="UpdateWxProduct">
    <div v-if="!roleBranch">
      <el-card style="margin:20px">
        <SelectBranch typeclass="wx" @BranchChanged="branchChangeEvent" />
      </el-card>
    </div>
    <!-- <el-card style="margin:20px" class="maincontent"> -->
    <div style="margin:20px">
      <ul v-loading="loading" class="prodlist">
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
    <!-- </el-card> -->
    </div>
  </div>
</template>

<script>
import store from '@/store'
import { listProductByBranch, updateWxProductOnsale } from '@/api/wxproduct'
import SelectBranch from '@/components/widgets/SelectBranch'

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
      products: []
    }
  },
  watch: {
    selectedBranch(val, oldval) {
      // console.log(val, oldval)
      if (val !== 0) {
        this.retriveData()
      }
    }
  },
  created: function() {
    if (store.getters.roles.includes('branch')) {
      this.selectedBranch = store.getters.branches
      this.roleBranch = true
      // this.retriveData()
    }
  },
  methods: {
    retriveData: function() {
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
    updatetrue: function(productid) {
      this.update(productid, 1)
    },
    updatefalse: function(productid) {
      this.update(productid, 0)
    },
    update: function(productid, flag) {
      var that = this
      this.loading = true
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
.namecontents{width:100%; display: inline-flex;padding: 5px 0px; justify-content: center;align-items:center}
.id{flex-grow: 1;flex-shrink: 1;flex-basis: 0; font-size:14px; color:#303133}
.buttons{flex-grow: 3;flex-shrink: 1;flex-basis: 0; }
.name{flex-grow: 4;flex-shrink: 1;flex-basis: 0; font-size:14px; color:#303133}
.textleft{text-align:left}
.textright{text-align:right}
.header{width:100%;padding:5px;margin:0;display: flex; background: #f2f2f2}

</style>
