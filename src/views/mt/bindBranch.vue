<template>
  <div class="accept-container">
    <div ref="critheader" style="padding:10px 20px">
      <el-card>
        <SelectBranch typeclass="mt" @BranchChanged="branchChangeEvent" />
        <el-button type="primary" size="small" @click="bindBranch">绑定美团门店</el-button>
      </el-card>
    </div>
    <iframe v-show="iframeState" :id="show-iframe" :src="bindBranchUrl" frameborder="0" name="showHere" scrolling="auto" />
  </div>
</template>

<script>
// import store from '@/store'
import SelectBranch from '@/components/widgets/SelectBranch'
export default {
  name: 'BindMeituanBranch',
  components: {
    SelectBranch
  },
  data() {
    return {
      iframeState: false,
      bindBranchUrl: ''
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
    const oIframe = document.getElementById('show-iframe')
    const deviceWidth = document.documentElement.clientWidth
    const deviceHeight = document.documentElement.clientHeight
    oIframe.style.width = deviceWidth + 'px'
    oIframe.style.height = deviceHeight + 'px'
  },
  methods: {
    showIframe() {
      this.goBackState = true
      this.iframeState = true
    },
    bindBranch(){
      this.bindBranchUrl = "http://www.baidu.com"
    }
  }
}

</script>
<style scoped>

</style>
