import Vue from 'vue'
import Vuex from 'vuex'
import {createStore} from 'vuex-smart-module'
import {games} from './modules/games'
import saves from './modules/saves'

Vue.use(Vuex)

// export default new Vuex.Store({
//   modules: {
//     games,
//     saves,
//     settings
//   },
//   strict: process.env.NODE_ENV !== 'production'
// })

export const store = createStore(
  games,
  {
    strict: process.env.NODE_ENV !== 'production'
  }
)
