import {Module} from 'vuex-smart-module'
import {saves} from './saves'
import {settingsStore} from './settingsStore'

export const root = new Module({
  modules: {
    saves,
    settingsStore
  }
})
