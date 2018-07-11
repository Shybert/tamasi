// src/index.ts

import Vue from 'vue'
import App from './App.vue'
import Overlay from './components/Overlay/Overlay.vue'
import router from './router'

if (window.location.hash.startsWith('#/overlay')) {
  // tslint:disable-next-line:no-unused-expression
  new Vue({
    el: '#app',
    template: '<Overlay></Overlay>',
    components: {Overlay},
    router
  })
} else {
  // tslint:disable-next-line:no-unused-expression
  new Vue({
    el: '#app',
    template: '<App></App>',
    components: {App},
    router
  })
}
