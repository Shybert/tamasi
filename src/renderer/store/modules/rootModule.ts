import {Module} from 'vuex-smart-module'
import {games} from './games'
import {saves} from './saves'

export const root = new Module({
  modules: {
    games,
    saves
  }
})
