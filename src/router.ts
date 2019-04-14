import Vue from 'vue'
import Router from 'vue-router'
import SavesComponent from '@/views/Saves.vue'
import ChartsComponent from '@/views/Charts.vue'
// import Overlay from '@/views/Overlay.vue'
import SettingsComponent from '@/views/Settings.vue'

Vue.use(Router)

const routes = [
  // {path: '/', redirect: `/saves/${store.getters.settingValue('general', 'defaultGame')}`, props: true},
  { path: '/saves/:gameId', component: SavesComponent, props: true },
  { path: '/charts/:gameId/:saveId', component: ChartsComponent, props: true },
  // { path: '/overlay/:gameId/:saveId', component: Overlay, props: true },
  { path: '/settings', component: SettingsComponent, props: true }
]

export default new Router({ routes })
