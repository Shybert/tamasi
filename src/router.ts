import Vue from 'vue'
import Router from 'vue-router'
import SavesComponent from '@/views/Saves.vue'
import ChartsComponent from '@/views/Charts.vue'
import OverlayComponent from '@/views/Overlay.vue'

Vue.use(Router)

const routes = [
  { path: '/:gameId?', component: SavesComponent, props: true },
  { path: '/charts/:gameId/:saveId', component: ChartsComponent, props: true },
  { path: '/overlay/:gameId/:saveId', component: OverlayComponent, props: true }
]

export default new Router({ routes })
