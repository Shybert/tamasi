import Vue from 'vue'
import VueRouter from 'vue-router'

import GamesComponent from './components/Games/Games.vue'
import SavesComponent from './components/Saves/Saves.vue'
import Overlay from './Overlay.vue'

const routes = [
  {path: '/', component: GamesComponent},
  {path: '/saves/:gameId', component: SavesComponent},
  {path: '/overlay/:gameId/:saveId', component: Overlay}
]

Vue.use(VueRouter)

export default new VueRouter({routes})
