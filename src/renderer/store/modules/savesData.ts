import Vue from 'vue'
import * as crypto from 'crypto'
import throttle from 'lodash/throttle'
import {IGame} from './gameData'
import Store from 'electron-store'
const savesData = new Store({name: 'saves', cwd: 'storage'})

// Saves interface
export interface ISaveBossInfo {
  name: string,
  time: number,
  deaths: number
}
interface ISaveBosses {
  [x: string]: ISaveBossInfo
}
export interface ISave {
  name: string
  bosses: ISaveBosses
  selected: string
}
export interface ISaves {
  [x: string]: { // Game ID
    [x: string]: ISave // Save ID
  }
}

interface ISavesState {
  showNewSaveOverlay: boolean,
  saves: ISaves
}

const state: ISavesState = {
  showNewSaveOverlay: false,
  saves: savesData.get('games')
}
function saveSave (): void {
  savesData.set('games', state.saves)
}
const throttledSaveSave = throttle(saveSave, 5000)

const mutations = {
  toggleNewSaveOverlay (state: ISavesState, payload: {showNewSaveOverlay: boolean}) {
    state.showNewSaveOverlay = payload.showNewSaveOverlay
  },
  createSave (state: ISavesState, payload: {save: ISave, saveId: string, gameId: string}) {
    // Use Vue.set because otherwise Vue cannot detect property addition
    Vue.set(state.saves[payload.gameId], payload.saveId, payload.save)

    throttledSaveSave()
  },

  setSelectedBoss (state: ISavesState, payload: {gameId: string, saveId: string, selectedBossId: string}) {
    state.saves[payload.gameId][payload.saveId].selected = payload.selectedBossId
    throttledSaveSave()
  }
}

const actions = {
  createSave ({state, commit, rootState}: {state: ISavesState, commit: any, rootState: any},
    payload: {saveName: string, gameId: string}) {
    const gameData: IGame = rootState.gameData.games[payload.gameId]
    const save = generateSave(payload.saveName, gameData)
    const generatedSaveId: string = crypto.randomBytes(16).toString('hex')

    commit('createSave', {save, saveId: generatedSaveId, gameId: payload.gameId})
  }
}

function generateSave (name: string, gameData: IGame): ISave {
  let saveName: string = name

  if (!saveName) {
    // No name provided for save, use default name
    saveName = gameData.name
  }

  const bossList = gameData.bosses as ISaveBosses
  // Insert properties for each boss
  Object.keys(bossList).forEach((bossId): void => {
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

export default {
  state,
  mutations,
  actions
}
