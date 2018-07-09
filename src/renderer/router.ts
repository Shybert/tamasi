import Vue from 'vue'
import VueRouter from 'vue-router'

import GamesComponent from './components/Games/Games.vue'
import SavesComponent from './components/Saves/Saves.vue'

const routes = [
  {path: '/', component: GamesComponent},
  {path: '/saves/:id', component: SavesComponent}
]

Vue.use(VueRouter)

export default new VueRouter({routes})
