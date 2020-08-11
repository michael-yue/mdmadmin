import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css

import echarts from 'echarts'
Vue.prototype.$echarts = echarts

import App from './App'
import router from './router'
import store from './store'

// import * as socketApi from '@/utils/socket'

import '@/icons' // icon
import '@/permission' // permission control

Vue.use(ElementUI, { locale })

Vue.config.productionTip = false
// Vue.prototype.socketApi = socketApi

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
