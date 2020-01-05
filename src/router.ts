import Vue, { VueConstructor } from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Overlay from '@/views/Overlay.vue'

Vue.use(Router)

// * as VueConstructor<Vue> is a temporary workaround
// because of a bug in the composition API.
// https://github.com/vuejs/vue-router/issues/3019
const routes = [
  { path: '/', component: Home as VueConstructor<Vue>, props: true },
  {
    path: '/overlay/:saveId',
    component: Overlay as VueConstructor<Vue>,
    props: true
  }
]

export default new Router({ routes })
