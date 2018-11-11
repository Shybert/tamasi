import Vue from 'vue'
import VueRouter from 'vue-router'

import GamesComponent from './components/Games/Games.vue'
import SavesComponent from './components/Saves/Saves.vue'
import ChartsComponent from './components/Charts/Charts.vue'
import Overlay from './Overlay.vue'
import SettingsComponent from './components/Settings/Settings.vue'

const routes = [
  {path: '/', component: GamesComponent},
  {path: '/saves/:gameId', component: SavesComponent},
  {path: '/charts/:gameId/:saveId', component: ChartsComponent},
  {path: '/overlay/:gameId/:saveId', component: Overlay},
  {path: '/settings', component: SettingsComponent}
]

Vue.use(VueRouter)

export default new VueRouter({routes})
