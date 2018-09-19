import Vue from 'vue'
import Vuex from 'vuex'
import gameData from './modules/gameData'
import saves from './modules/saves'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    gameData,
    saves
  },
  strict: process.env.NODE_ENV !== 'production'
})
