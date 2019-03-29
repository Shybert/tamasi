import {Module} from 'vuex-smart-module'
import {saves} from './savesStore'
import {settingsStore} from './settingsStore'

export const root = new Module({
  modules: {
    saves,
    settingsStore
  }
})
