import Vue from 'vue'
import Vuex from 'vuex'
import games from './modules/games'
import saves from './modules/saves'
import settings from './modules/settings'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    games,
    saves,
    settings
  },
  strict: process.env.NODE_ENV !== 'production'
})
