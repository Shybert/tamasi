// src/index.ts

import Vue from 'vue'
import App from './App.vue'
import router from './router'

// tslint:disable-next-line:no-unused-expression
new Vue({
  el: '#app',
  template: '<App></App>',
  components: {App},
  router
})
