import Vue from 'vue'
import Vuex from 'vuex'
import { createStore } from 'vuex-smart-module'
import { root } from './modules/rootModule'

Vue.use(Vuex)

export const store = createStore(root, {
  strict: process.env.NODE_ENV !== 'production'
})
