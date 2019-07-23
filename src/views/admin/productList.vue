<template>
  <div class="product">
    <div ref="critheader" style="padding:10px 20px">
      <el-card style="display:none">
        <!-- <SelectBranch typeclass="mt" @BranchChanged="branchChangeEvent" /> -->
      </el-card>
    </div>
    <el-card :style="{height: myHeight}" style="margin: 0 10px">
      <div style="display:flex; flex-direction:row">
        <div class="left">
          <div style="text-align:right">
            <el-button size="small" @click="showNewProductTypeDialog" style="margin-right:10px">添加</el-button>
          </div>
          <ul class="producttypes">
            <li v-for="type in producttypes" :key="type.typeName" :class="{active: activeProductType == type}" @click="productTypeselected(type)">
              <div>{{ type.typeName }}</div>
              <div @click="showProductTypeDialog(type)"><i class="el-icon-edit"></i></div>
            </li>
          </ul>
        </div>
        <div class="right">
          <div style="text-align:right">
            <el-button size="small" @click="showNewProductDialg" style="margin-right:10px">添加</el-button>
          </div>
          <ul>
            <li v-for="product in filteredProducts" :key="product.name">
              <div style="display:flex">
                <div style="flex:1; margin:auto; padding-left:20px; display:flex; justify-content:space-between">
                  <span style="margin:auto; flex: 0 0 10%">{{ product.productId }}</span>
                  <span style="margin:auto; flex: 0 0 40%">{{ product.productName }}</span>
                  <span style="margin:auto; flex: 0 0 10%">¥{{product.price}}</span>
                  <span style="margin:auto; flex: 0 0 10%">{{product.orderSeq}}</span>
                  <span style="margin:auto; flex: 0 0 30%">
                    <el-button size="small" @click="showProductDialg(product)"><i class="el-icon-edit"></i>修改</el-button>
                    <el-button size="small" @click="deleteProduct(product)"><i class="el-icon-delete"></i>删除</el-button>
                  </span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </el-card>
    <el-dialog
      :visible.sync="dialogProductTypeVisible"
      :fullscreen="false"
      :modal="true"
      :show-close="true"
      title="产品类型"
      top="5vh">
      <div>
        <el-form ref="editProductTypeForm" :model="editProductTypeForm" :rules="editProductTypeFormRules" label-width="120px">
          <el-form-item label="产品类型代码" prop="typeId">
            <el-input v-model="editProductTypeForm.typeId" size="small" maxlength="20"/>
          </el-form-item>
          <el-form-item label="产品类型名称" prop="typeName">
            <el-input v-model="editProductTypeForm.typeName" size="small" maxlength="20"/>
          </el-form-item>
          <el-form-item label="显示顺序" prop="orderSeq">
            <el-input v-model="editProductTypeForm.orderSeq" size="small" maxlength="20"/>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-radio-group v-model="editProductTypeForm.status">
              <el-radio label="1">在售</el-radio>
              <el-radio label="0">停售</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="closeProductTypeDialog">取 消</el-button>
        <el-button v-if="dialogProductTypeStatus =='create'" type="primary" @click="createProductType">新建</el-button>
        <el-button v-else type="primary" @click="updateProductType">修改保存</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogProductVisible"
      :fullscreen="false"
      :modal="true"
      :show-close="true"
      title="产品维护"
      top="5vh">
      <div>
        <el-form ref="editProductForm" :model="editProductForm" :rules="editProductFormRules" label-width="80px">
          <el-form-item label="产品代码" prop="productId">
            <el-input v-model="editProductForm.productId" size="small" maxlength="20"/>
          </el-form-item>
          <el-form-item label="产品名称" prop="productName">
            <el-input v-model="editProductForm.productName" size="small" maxlength="20"/>
          </el-form-item>
          <el-form-item label="产品描述" prop="productDesc">
            <el-input v-model="editProductForm.productDesc" size="small" maxlength="20"/>
          </el-form-item>
          <el-form-item label="单价" prop="price">
              <el-input v-model="editProductForm.price" size="small" maxlength="20"/>
          </el-form-item>
          <el-form-item label="显示顺序" prop="orderSeq">
            <el-input v-model="editProductForm.orderSeq" size="small" maxlength="20"/>
          </el-form-item>
          <el-form-item label="产品类型" prop="productType">
            <ProductTypeSelector :product-type-id="editProductForm.productType.id" :shop-id="shopId" @ProductTypeChanged="ProductTypeChangedEvent" />
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-radio-group v-model="editProductForm.status">
              <el-radio label="1">在售</el-radio>
              <el-radio label="0">停售</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="closeProductDialog">取 消</el-button>
        <el-button v-if="dialogProductStatus=='create'" type="primary" @click="createProduct">新建</el-button>
        <el-button v-else type="primary" @click="updateProduct">修改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import store from '@/store'
import ProductTypeSelector from '@/components/widgets/ProductTypeSelector'
import { listAllProductType, listAllProduct, updateProductType, updateProduct, createProductType, createProduct } from '@/api/product.js'
export default {
  name: 'product',
  components: {
    ProductTypeSelector
  },
  data () {
    return {
      loading: false,
      myHeight: 0,
      activeIndex: '3',
      selectedBranch: '1',
      shopId: 1,
      productTypeId: 0,
      producttypes: [],
      products: [],
      activeProductType: {},
      filteredProducts: [],
      // Dialog
      dialogProductTypeStatus: '',
      dialogProductStatus: '',
      dialogProductTypeVisible: false,
      dialogProductVisible: false,
      editProductForm: {
        productType: {
          id: 0
        },
        id: 0
      },
      editProductTypeForm: {
        id: 0,
        typeId: '',
        typeName: '',
        orderSeq: '',
        status: '0'
      },
      editProductTypeFormRules: {
        typeId: [{ required: true, message: '请输入编码', trigger: 'blur' }],
        typeName: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        orderSeq: { required: true, message: '请输入顺序', trigger: 'blur' }
      },
      editProductFormRules: {
        productId: [{ required: true, message: '请输入编码', trigger: 'blur' }],
        productName: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        orderSeq: { required: true, message: '请输入顺序', trigger: 'blur' },
        price: { required: true, message: '请输入单价', trigger: 'blur' }
      }
    }
  },
  mounted () {
    const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight // 浏览器高度
    const critheaderheight = this.$refs.critheader.offsetHeight
    this.myHeight = (h - critheaderheight - 60) + 'px'
    var that = this
    window.onresize = function windowResize () {
      const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight // 浏览器高度
      that.myHeight = (h - critheaderheight - 60) + 'px'
    }
    this.retrieveData()
  },
  created: function () {
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
    selectedBranch (val, oldval) {
      if (val !== 0) {
        this.retrieveData()
      }
    },
    activeProductType (val, oldval) {
      this.filteredProducts = this.products.filter(function (item) {
        return item.productType.typeId === val.typeId
      })
    }
  },
  methods: {
    branchChangeEvent: function (event) {
      this.selectedBranch = event.branchId
    },
    showProductTypeDialog: function (type) {
      this.editProductTypeForm.id = type.id
      this.editProductTypeForm.typeId = type.typeId
      this.editProductTypeForm.typeName = type.typeName
      this.editProductTypeForm.orderSeq = type.orderSeq
      this.editProductTypeForm.status = type.status
      this.dialogProductTypeStatus = 'update'
      this.dialogProductTypeVisible = true
    },
    showNewProductTypeDialog: function () {
      this.editProductTypeForm = {
        id: 0,
        typeId: '',
        typeName: '',
        orderSeq: '',
        status: 0
      }
      this.dialogProductTypeStatus = 'create'
      this.dialogProductTypeVisible = true
    },
    showNewProductDialg: function () {
      this.editProductForm = {
        id: 0,
        productId: '',
        productName: '',
        price: '',
        orderSeq: '',
        status: 0,
        productType: {
          id: 0
        }
      }
      this.dialogProductStatus = 'create'
      this.dialogProductVisible = true
    },
    showProductDialg: function (product) {
      this.editProductForm.id = product.id
      this.editProductForm.productId = product.productId
      this.editProductForm.productName = product.productName
      this.editProductForm.price = product.price
      this.editProductForm.orderSeq = product.orderSeq
      this.editProductForm.status = product.status
      this.editProductForm.productType = product.productType
      console.log(this.editProductForm)
      this.dialogProductStatus = 'update'
      this.dialogProductVisible = true
    },
    deleteProduct: function () {
      // delete confirm
    },
    closeProductTypeDialog: function () {
      this.dialogProductTypeVisible = false
    },
    closeProductDialog: function () {
      this.dialogProductVisible = false
    },
    createProductType: function () {
      var param = {
        shopid: store.getters.branches,
        typeid: this.editProductTypeForm.typeId,
        typename: this.editProductTypeForm.typeName,
        orderseq: this.editProductTypeForm.orderSeq,
        status: this.editProductTypeForm.status
      }
      createProductType(param).then(res => {
        if (res.code === 20000) {
          this.dialogProductTypeVisible = false
          this.retrieveData()
        }
      }).catch(error => {
        console.log(error)
      })
    },
    updateProductType: function () {
      var param = {
        id: this.editProductTypeForm.id,
        shopid: store.getters.branches,
        typeid: this.editProductTypeForm.typeId,
        typename: this.editProductTypeForm.typeName,
        orderseq: this.editProductTypeForm.orderSeq,
        status: this.editProductTypeForm.status
      }
      updateProductType(param).then(res => {
        if (res.code === 20000) {
          this.dialogProductTypeVisible = false
          this.retrieveData()
        }
      }).catch(error => {
        console.log(error)
      })
    },
    createProduct: function () {
      this.loading = true
      var that = this
      var param = {
        shopid: store.getters.branches,
        typeid: this.editProductForm.typeId,
        typename: this.editProductForm.typeName,
        orderseq: this.editProductForm.orderSeq,
        status: this.editProductForm.status
      }
      createProduct(param).then(res => {
        if (res.code === 20000) {
          this.retrieveData()
          this.dialogProductVisible = false
          // that.products = res.data
          // that.filteredProducts = that.products.filter(function (item) {
          //   return item.category_name === that.activeProductType.name
          // })
        }
        that.loading = false
      }).catch(error => {
        console.log(error)
      })
    },
    updateProduct: function () {
      this.loading = true
      var that = this
      var param = {
        id: this.editProductForm.id,
        shopid: store.getters.branches,
        productId: this.editProductForm.productId,
        productName: this.editProductForm.productName,
        orderSeq: this.editProductForm.orderSeq,
        price: this.editProductForm.price,
        productTypeId: this.editProductForm.productType.id
      }
      console.log(param)
      updateProduct(param).then(res => {
        if (res.code === 20000) {
          this.retrieveData()
          this.dialogProductVisible = false
        }
        that.loading = false
      }).catch(error => {
        console.log(error)
      })
    },
    listAllCat: function () {
      var that = this
      listAllProductType(this.selectedBranch).then(response => {
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
      listAllProduct(this.selectedBranch).then(response => {
        that.products = response.data
        that.loading = false
      }).catch(error => {
        console.log(error)
      })
    },
    listAllMemberTyoe: function () {
      // list all member
    },
    retrieveData: function () {
      var that = this
      listAllProductType(this.selectedBranch).then(response => {
        that.producttypes = response.data
        if (that.producttypes.length > 0) {
          that.activeProductType = that.producttypes[0]
        }
        listAllProduct(this.selectedBranch).then(response => {
          that.products = response.data
          that.filteredProducts = that.products.filter(function (item) {
            return item.productType.typeId === that.activeProductType.typeId
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
    ProductTypeChangedEvent: function (event) {
      console.log(event)
    },
    productTypeselected: function (item) {
      console.log(item)
      this.activeProductType = item
    },
    handleSelect (key, keyPath) {
      if (key === '1') {
        this.$router.push('/system/setting')
      } else if (key === '2') {
        this.$router.push('/system/usertype')
      } else if (key === '3') {
        this.$router.push('/system/product')
      }
    }
  }
}
</script>

<style scoped>
.el-menu--horizontal>.el-menu-item {height:40px; line-height: 40px}
.left { flex: 0 0 20%; border-right: 1px solid #e0c9c9}
.left ul li{ font-size: 13px; display:flex; }
.left ul li.active{ color: #800008}
.producttypes li {display:flex; justify-content: space-between;padding: 10px; cursor: -webkit-grab }
.producttypes li:hover {background: #f3f3f3}

.right {flex: 1; padding:0 10px; font-size: 13px}
.right ul li{padding:10px;border-bottom: 1px solid #f3f3f3}
.right ul li::first{padding-top:0; }
</style>
