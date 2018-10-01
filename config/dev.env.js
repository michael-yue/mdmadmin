'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin"'
  // BASE_API: '"http://192.168.2.1:8080/MTOMWEB"',
  BASE_API: '"https://mdm.cchkxx.com"',
})
