<template>
  <div class="accept-container">
    <div ref="critheader" style="padding:10px 20px">
      <span> header</span>
    </div>
    <div>
      <span>卡券</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WxCardList',
  data() {
    return {
      iframeState: false,
      bindBranchUrl: ''
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
    }
  }
}

</script>

<style scoped>

</style>
