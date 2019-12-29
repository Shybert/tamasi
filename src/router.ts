import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Overlay from '@/views/Overlay.vue'

Vue.use(Router)

const routes = [
  { path: '/', component: Home, props: true },
  { path: '/overlay/:saveId', component: Overlay, props: true }
]

export default new Router({ routes })
