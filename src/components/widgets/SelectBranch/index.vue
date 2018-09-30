<template>
  <div class="branchselect">
    <div v-if="show">
      <div class="inlinelabel">门店</div>
      <el-select v-model="selectedBranchId" size="small" class="text-left">
        <el-option v-for="item in branches" :value="item.branchId" :label="item.name" :key="item.id" name="branch" placeholder="请选择门店">
          {{ item.name }}
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import { getWxBranch } from '@/api/wxproduct'
export default {
  name: 'SelectBranch',
  props: {
    branchId: {
      default: '',
      type: String
    }
  },
  data() {
    return {
      selectedBranchId: '',
      branches: [],
      show: true
    }
  },
  watch: {
    selectedBranchId(val, oldval) {
      this.$emit('BranchChanged', { branchId: this.selectedBranchId })
    }
  },
  created: function() {
    // console.log(store.getters.branches)
    const roles = store.getters.roles
    console.log(roles, '1')
    if (roles.includes('branch')) {
      this.show = false
      // this.selectedBranchId = ''
      console.log(roles, '1')
    } else {
      this.show = true
      console.log(roles, '0')
      this.retriveWxBranch()
    }
  },
  methods: {
    retriveWxBranch: function() {
      var that = this
      getWxBranch().then(response => {
        that.branches = response.data
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
