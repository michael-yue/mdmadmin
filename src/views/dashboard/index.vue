<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">{{ name }}</div> -->
    <!-- <div class="dashboard-text">roles:<span v-for="role in roles" :key="role">{{ role }}</span></div> -->
    <div v-if="roles.includes('branch')">
      <widgetBranch />
    </div>
    <div v-if="roles.includes('admin')">
      <widgetManager />
    </div>
    <div v-if="roles.includes('marketing')">
      <widgetMarket />
    </div>
    <div v-if="roles.includes('finance')" class="hljs">
      <widgetFinancial />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import widgetBranch from './components/widgetBranch'
import widgetFinancial from './components/widgetFinancial'
import widgetMarket from './components/widgetMarket'
import widgetManager from './components/widgetManager'

export default {
  name: 'Dashboard',
  components: {
    widgetBranch,
    widgetFinancial,
    widgetMarket,
    widgetManager
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-container {
  margin: 30px;
  @media screen and (max-width: 420px) {
    margin: 10px;
  }
}

</style>
<style scoped>


</style>
