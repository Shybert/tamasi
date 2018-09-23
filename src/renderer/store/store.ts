import Vue from 'vue'
import Vuex from 'vuex'
import gameData from './modules/gameData'
import savesData from './modules/savesData'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    gameData,
    savesData
  },
  strict: process.env.NODE_ENV !== 'production'
})
