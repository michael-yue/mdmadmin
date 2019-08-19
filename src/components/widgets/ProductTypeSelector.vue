<template>
  <div class="productTypeSelector">
    <div v-if="show">
      <div class="inlinelabel">产品类型</div>
      <el-select v-model="selectedProductTypeId" size="small" class="text-left">
        <el-option v-for="item in productTypes" :value="item.typeId" :label="item.name" :key="item.id" name="productType" placeholder="请选择产品类型">
          {{ item.name }}
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import { listProductType } from '@/api/product'
export default {
  name: 'SelectProductType',
  props: {
    productTypeId: {
      default: '',
      type: String
    },
    typeclass: {
      default: '',
      type: String
    }
  },
  data() {
    return {
      selectedProductTypeId: '',
      productTypes: [],
      show: true
    }
  },
  watch: {
    selectedProductTypeId(val, oldval) {
      this.$emit('ProductTypeChanged', { productTypeId: this.selectedProductTypeId })
    }
  },
  created: function() {
    const roles = store.getters.roles
    if (roles.includes('branch')) {
      this.show = false
    } else {
      this.show = true
      this.retriveData()
    }
  },
  methods: {
    retriveData: function() {
      var that = this
      listProductType().then(response => {
        that.productTypes = response.data
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style scope>
.branchselect{display:inline-block;margin:0px 5px}
.inlinelabel {position:relative;font-size:14px;display:inline-block;margin:0px 10px}
</style>
