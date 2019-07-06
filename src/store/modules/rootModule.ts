import { Module } from 'vuex-smart-module'
import { saves } from './savesStore'

export const root = new Module({
  modules: {
    saves
  }
})
