// src/index.ts

import Vue from 'vue'
import App from './App.vue'
import Overlay from './components/Overlay/Overlay.vue'
import router from './router'
import store from './store/store'

const isOverlay: boolean = window.location.hash.startsWith('#/overlay')
// tslint:disable-next-line:no-unused-expression
new Vue({
  el: '#app',
  template: isOverlay ? '<Overlay></Overlay>' : '<App></App>',
  components: isOverlay ? {Overlay} : {App},
  router,
  store
})
