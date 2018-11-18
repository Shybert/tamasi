import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store/store'

import SavesComponent from './components/Saves/Saves.vue'
import ChartsComponent from './components/Charts/Charts.vue'
import Overlay from './components/Overlay/Overlay.vue'
import SettingsComponent from './components/Settings/Settings.vue'

const routes = [
  {path: '/', redirect: `/saves/${store.getters.settingValue('general', 'defaultGame')}`, props: true},
  {path: '/saves/:gameId', component: SavesComponent, props: true},
  {path: '/charts/:gameId/:saveId', component: ChartsComponent, props: true},
  {path: '/overlay/:gameId/:saveId', component: Overlay, props: true},
  {path: '/settings', component: SettingsComponent, props: true}
]

Vue.use(VueRouter)

export default new VueRouter({routes})
