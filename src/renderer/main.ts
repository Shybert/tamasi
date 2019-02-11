import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import SettingsPlugin from './settings/settingsPlugin'
Vue.use(SettingsPlugin)

const isOverlay: boolean = window.location.hash.startsWith('#/overlay')
// tslint:disable-next-line:no-unused-expression
new Vue({
  el: '#app',
  template: `<App :isOverlay="${isOverlay}"></App>`,
  components: {App},
  router,
  store
})
