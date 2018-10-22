<template>
  <div class="UpdateMtProduct">
    <div v-show="!roleBranch" ref="critheader" style="padding:10px 20px">
      <el-card>
        <SelectBranch typeclass="mt" @BranchChanged="branchChangeEvent" />
        <el-button type="primary" size="small" @click="mapdish">映射美团产品</el-button>
      </el-card>
    </div>
    <div :style="{height: myHeight}" style="padding:10px 20px">
      <el-card>
        <el-table v-loading="loading" :data="products" size="small" height="100%">
          <el-table-column prop="prodid" label="收银系统产品代码" width="150"/>
          <el-table-column prop="mtdishname" label="名称"/>
          <el-table-column prop="mtdishid" label="美团代码"/>
          <el-table-column label="操作" >
            <template slot-scope="props">
              <el-button type="success" size="small" @click="updatecode(props.$index, props.row)">修改代码</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <el-dialog :visible.sync="dialogFormVisible" title="美图菜品映射">
      <el-form :model="form">
        <el-form-item :label-width="formLabelWidth" label="收银系统菜品代码">
          <el-input v-model="form.prodid" auto-complete="off" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="菜品名称" >
          <el-input v-model="form.mtdishname" readonly />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import store from '@/store'
import { listMtProductByBranch, mapMtProductsByBranch } from '@/api/wxproduct'
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
      currentIndex: '',
      myHeight: '',
      dialogFormVisible: false,
      form: {
        prodid: '',
        mtdishname: '',
        mtdishid: ''
      },
      formLabelWidth: '150px'
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
      var that = this
      this.loading = true
      if (this.selectedBranch !== '') {
        listMtProductByBranch(this.selectedBranch).then(response => {
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
    updatecode: function(index, row) {
      this.form.prodid = this.products[index].prodid
      this.form.mtdishname = this.products[index].mtdishname
      this.form.mtdishid = this.products[index].mtdishid
      this.currentIndex = index
      this.dialogFormVisible = true
    },
    update: function() {
      this.loading = true
      var ret1 = this.products.find((value, index, arr) => {
        return value.mtdishid === this.form.mtdishid
      })
      ret1.prodid = this.form.prodid
      this.dialogFormVisible = false
      this.loading = false
    },
    mapdish: function() {
      mapMtProductsByBranch(this.selectedBranch, this.products).then(response => {
        if (response.code === 20000) {
          this.$message({
            message: '美团产品映射成功!',
            type: 'success'
          })
        } else {
          this.$message({
            message: '美团产品映射失败，原因：' + response.message,
            type: 'warning'
          })
        }
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
.el-card >>> .el-card__body {height:100%}
.el-card{height:100%}
</style>
