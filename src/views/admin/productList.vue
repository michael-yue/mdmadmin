<template>
  <div class="productlist">
    <div ref="critheader" style="padding:10px 20px">
      <el-card>
        <div style="inline-block">
          <div class="inlinelabel">产品类型</div>
        </div>
        <el-radio-group>
          <el-radio-button size="small">在售</el-radio-button>
          <el-radio-button size="small">下架</el-radio-button>
        </el-radio-group>
      </el-card>
    </div>
    <div :style="{height: myHeight}" style="padding:0 20px 10px 20px;">
      <el-table
        v-loading="loading"
        ref="refTable"
        :data="tableData"
        :class="{'tablestyle': true}"
        :header-cell-style="tableheader"
        size="small"
        height="100%">
        <el-table-column prop="photo" label="图片" width="" header-align="center" align="center" >
          <template slot-scope="props">
            <img :src="props.row.photo" alt="" style="width: 80px;height: 70px">
          </template>
        </el-table-column>
        <el-table-column prop="productid" label="产品编码" width="" header-align="center" align="left" />
        <el-table-column prop="name" label="产品名称" width="" header-align="center" align="left" />
        <el-table-column prop="type" label="产品类别" width="" header-align="center" label-class-name	="header" align="left" />
        <el-table-column prop="price" label="单价" width="" header-align="center" align="right" />
        <el-table-column prop="onsale" label="操作" width="" header-align="center" align="right" >
          <template slot-scope="props">
            <div style="display:flex">
              <el-button type="primary" size="small" @click="ShowProdDetail(props.row.id)">详细</el-button>
              <el-button type="primary" size="small">售卖门店</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top:10px; text-align: right">
        <el-pagination
          :current-page="currentPage"
          :page-size="limit"
          :total="total"
          layout="total, sizes, prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="pagechange" />
      </div>
    </div>
    <el-dialog
      :visible.sync="dialogDetail"
      :fullscreen="false"
      :modal="true"
      :show-close="true"
      title="人员信息"
      top="5vh">
      <div>
        <el-form ref="editForm" :model="editForm" :rules="editFormRules" label-width="100px">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="editForm.name" size="small" maxlength="40"/>
          </el-form-item>
          <el-form-item label="单位" prop="branchid">
            <branch-selector :branch-id="editForm.branchid" @BranchChanged="branchSelectedEvent" />
          </el-form-item>
          <el-form-item label="登录名" prop="loginid">
            <el-input v-model="editForm.loginid" size="small" maxlength="20"/>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="editForm.password" size="small" maxlength="20"/>
          </el-form-item>
          <el-form-item label="类型" prop="positionid">
            <user-position-selector :user-position-id="editForm.positionid" @PositionChanged="userPositionSelectedEvent"/>
          </el-form-item>
          <el-row>
            <el-col :span="10">
              <el-form-item label="职级" prop="levelid">
                <user-level-selector :user-level-id="editForm.levelid" @LevelChanged="levelSelectedEvent"/>
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item label="测评人职级" prop="type">
                <user-level-selector :user-level-id="editForm.type" @LevelChanged="TypeSelectedEvent"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="职位">
            <el-input v-model="editForm.title" size="small" maxlength="40"/>
          </el-form-item>
          <el-form-item label="">
            <el-checkbox v-model="editForm.role">实名用户</el-checkbox>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="closeDialog">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createdata">添加</el-button>
        <el-button v-else type="primary" @click="updatedata">修改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import vpagination from '@/components/widgets/Pagination'
import { listProduct } from '@/api/product.js'

export default {
  name: 'ProductList',
  components: {
    vpagination
  },
  data() {
    return {
      myHeight: '',
      loading: false,
      // 表格变量
      tableData: [],
      total: 0,
      limit: 15,
      currentPage: 1,
      // dialog
      dialogDetail: false,
      editForm: {
        id: '',
        name: ''
      }
      // flag: false

    }
  },
  mounted() {
    const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight // 浏览器高度
    const critheaderheight = this.$refs.critheader.offsetHeight
    // const statHeight = this.$refs.critheader.offsetHeight
    this.myHeight = (h - critheaderheight - 100) + 'px'
    var that = this
    window.onresize = function windowResize() {
      const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight // 浏览器高度
      that.myHeight = (h - critheaderheight - 100) + 'px'
    }
  },
  created: function() {
    this.retrieve(1)
  },
  methods: {
    retrieve: function(currentPage) {
      this.loading = true
      listProduct(currentPage, this.limit).then(response => {
        this.tableData = response.data.products
        this.total = response.data.totalnum
        this.loading = false
      }).catch(error => {
        console.log(error)
      })
    },
    querystart: function() {
      this.retrieve(1)
    },
    tableheader({ row, index }) {
      return 'background:#DCDFE6;'
    },
    ShowProdDetail: function(id) {
      this.dialogDetail = true
    },
    // 分页处理
    pagechange: function(currentPage) {
      this.currentPage = currentPage
      this.retrieve()
    },
    handleSizeChange: function(currentSize) {
      this.limit = currentSize
      this.retrieve()
    }
  }
}
</script>
