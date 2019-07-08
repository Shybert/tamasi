import Vue from 'vue'
import { Mutations, Getters, Actions, Module } from 'vuex-smart-module'
import { games, IGame } from '../gamesData'
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
  name: string
  bosses: ISaveBosses
  selected: string
}
interface ISaves {
  [gameId: string]: {
    [saveId: string]: ISave
  }
}

class SavesState {
  showNewSaveOverlay: boolean = false
  saves: ISaves = {}
}

class SavesMutations extends Mutations<SavesState> {
  toggleNewSaveOverlay(payload: { showNewSaveOverlay: boolean }) {
    this.state.showNewSaveOverlay = payload.showNewSaveOverlay
  }
  writeSave(payload: { gameId: string; saveId: string; save: ISave }) {
    // Use Vue.set because otherwise Vue cannot detect property addition
    if (!(payload.gameId in this.state.saves))
      Vue.set(this.state.saves, payload.gameId, {})
    Vue.set(this.state.saves[payload.gameId], payload.saveId, payload.save)
  }

  setSelectedBoss(payload: { gameId: string; saveId: string; bossId: string }) {
    this.state.saves[payload.gameId][payload.saveId].selected = payload.bossId
  }
  incrementDeaths(payload: { gameId: string; saveId: string; bossId: string }) {
    this.state.saves[payload.gameId][payload.saveId].bosses[
      payload.bossId
    ].deaths += 1
  }
  decrementDeaths(payload: { gameId: string; saveId: string; bossId: string }) {
    if (
      this.state.saves[payload.gameId][payload.saveId].bosses[payload.bossId]
        .deaths <= 0
    )
      return
    this.state.saves[payload.gameId][payload.saveId].bosses[
      payload.bossId
    ].deaths -= 1
  }
  setBossTime(payload: {
    gameId: string
    saveId: string
    bossId: string
    time: number
  }) {
    this.state.saves[payload.gameId][payload.saveId].bosses[
      payload.bossId
    ].time = payload.time
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
    const save = generateSave(payload.saveName, games[payload.gameId])
    const generatedSaveId: string = crypto.randomBytes(16).toString('hex')

    this.commit('writeSave', {
      gameId: payload.gameId,
      saveId: generatedSaveId,
      save
    })
  }
}

function generateSave(saveName: string, gameData: IGame): ISave {
  const bossList = gameData.bosses as ISaveBosses
  // Insert properties for each boss
  Object.keys(bossList).forEach(bossId => {
    bossList[bossId].time = 0
    bossList[bossId].deaths = 0
  })

  // Insert the save info
  const save: ISave = {
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
