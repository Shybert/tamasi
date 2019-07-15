import Vue from 'vue'
import { Mutations, Getters, Actions, Module } from 'vuex-smart-module'
import { games } from '../gamesData'
import * as crypto from 'crypto'

// Saves interface
interface ISaveBossInfo {
  name: string
  time: number
  deaths: number
}
interface ISaveBosses {
  [bossId: string]: ISaveBossInfo
}
interface ISave {
  gameId: string
  name: string
  bosses: ISaveBosses
  selected: string
}
interface ISaves {
  [saveId: string]: ISave
}

class SavesState {
  saves: ISaves = {}
}

class SavesMutations extends Mutations<SavesState> {
  writeSave(payload: { saveId: string; save: ISave }) {
    Vue.set(this.state.saves, payload.saveId, payload.save)
  }

  setSelectedBoss(payload: { saveId: string; bossId: string }) {
    this.state.saves[payload.saveId].selected = payload.bossId
  }
  incrementDeaths(payload: { saveId: string; bossId: string }) {
    this.state.saves[payload.saveId].bosses[payload.bossId].deaths += 1
  }
  decrementDeaths(payload: { saveId: string; bossId: string }) {
    if (this.state.saves[payload.saveId].bosses[payload.bossId].deaths <= 0)
      return
    this.state.saves[payload.saveId].bosses[payload.bossId].deaths -= 1
  }
  setBossTime(payload: { saveId: string; bossId: string; time: number }) {
    this.state.saves[payload.saveId].bosses[payload.bossId].time = payload.time
  }
}

class SavesActions extends Actions<
  SavesState,
  Getters<SavesState>,
  SavesMutations,
  SavesActions
> {
  async createSave(payload: {
    gameId: string
    saveName: string
  }): Promise<void> {
    const save = generateSave(payload.gameId, payload.saveName)
    const saveId: string = crypto.randomBytes(16).toString('hex')

    this.commit('writeSave', {
      saveId,
      save
    })
  }
}

function generateSave(gameId: string, saveName: string): ISave {
  const bossList = games[gameId].bosses as ISaveBosses
  // Insert properties for each boss
  Object.keys(bossList).forEach(bossId => {
    bossList[bossId].time = 0
    bossList[bossId].deaths = 0
  })

  // Insert the save info
  const save: ISave = {
    gameId,
    name: saveName,
    bosses: bossList,
    selected: Object.keys(bossList)[0]
  }
  return save
}

export const saves = new Module({
  namespaced: false,
  state: SavesState,
  mutations: SavesMutations,
  actions: SavesActions
})
