import Vue from 'vue'
import VueRouter from 'vue-router'

import GamesComponent from './components/Games/Games.vue'

const routes = [
  {path: '/', component: GamesComponent}
]

Vue.use(VueRouter)

export default new VueRouter({routes})
