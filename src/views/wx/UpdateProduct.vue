<template>
  <div class="UpdateWxProduct">
    <div v-if="!roleBranch" ref="critheader" style="padding:10px 20px">
      <el-card>
        <SelectBranch typeclass="wx" @BranchChanged="branchChangeEvent" />
      </el-card>
    </div>
    <!-- <el-card style="margin:20px" class="maincontent"> -->
    <div :style="{height: myHeight}" style="padding:0 20px 10px 20px;">
      <el-card>
        <el-table v-loading="loading" :data="products" size="small" height="100%">
          <el-table-column prop="productid" width="100" label="编码"/>
          <el-table-column prop="name" width="300" label="名称"/>
          <el-table-column prop="onsale" width="100" label="操作">
            <template slot-scope="props">
              <el-button v-if="props.row.onsale === '0'" type="danger" size="small" @click="updatetrue(props.row.productid)" >上架</el-button>
              <el-button v-if="props.row.onsale === '1'" type="success" size="small" @click="updatefalse(props.row.productid)" >下架</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
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
      products: [],
      myHeight: ''
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
/* ul.prodlist{
  list-style-type: none;
  margin: 5px;
  padding: 0px 0px;
  display: block;
  height:100%;
  overflow: auto;
}
ul.prodlist>li {
  width: 100%;
  padding-left: 0px;
  border-bottom: solid 1px #ebebeb;
  justify-content: center;
}
ul.prodlist>li:first{
  border-top: solid 1px #ebebeb;
} */
.namecontents{width:100%; display: inline-flex;padding: 5px 0px; justify-content: center;align-items:center}
.id{flex-grow: 1;flex-shrink: 1;flex-basis: 0; font-size:14px; color:#303133}
.buttons{flex-grow: 3;flex-shrink: 1;flex-basis: 0; }
.name{flex-grow: 4;flex-shrink: 1;flex-basis: 0; font-size:14px; color:#303133}
.textleft{text-align:left}
.textright{text-align:right}
.header{width:100%;padding:5px;margin:0;display: flex; background: #f2f2f2}
.el-card >>> .el-card__body {height:100%}
.el-card{height:100%}
</style>
