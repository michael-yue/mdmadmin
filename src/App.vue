<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created: function() {
    const USER_AGENT = navigator.userAgent.toLowerCase()
    if (USER_AGENT.search('micromessenger') !== -1) {
      this.$store.dispatch('ToggleDevice', 'qywx')
    } else {
      this.$store.dispatch('ToggleDevice', 'desktop')
    }
  }
}
</script>
