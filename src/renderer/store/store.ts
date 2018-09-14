import Vue from 'vue'
import Vuex from 'vuex'
import gameData from './modules/gameData'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    gameData
  },
  strict: process.env.NODE_ENV !== 'production'
})
