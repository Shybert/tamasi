import {Module} from 'vuex-smart-module'
import {saves} from './saves'

export const root = new Module({
  modules: {
    saves,
  }
})
