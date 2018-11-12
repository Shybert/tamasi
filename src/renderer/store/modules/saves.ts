import Vue from 'vue'
import {DefineMutations, DefineGetters, DefineActions} from 'vuex-type-helper'
import * as crypto from 'crypto'
import throttle from 'lodash/throttle'
import {ChartData, ChartOptions} from 'chart.js'
import {IGame} from './games'
import formatBossTime from '../../utils/formatBossTime'

import Store from 'electron-store'
const savesData = new Store({name: 'saves', cwd: 'storage'})

// Saves interface
export interface ISaveBossInfo {
  name: string
  time: number
  deaths: number
}
interface ISaveBosses {
  [bossId: string]: ISaveBossInfo
}
export interface ISave {
  name: string
  bosses: ISaveBosses
  selected: string
}
export interface ISaves {
  [gameId: string]: {
    [saveId: string]: ISave
  }
}

interface ISavesState {
  showNewSaveOverlay: boolean
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

interface ISavesMutations {
  toggleNewSaveOverlay: {
    showNewSaveOverlay: boolean
  }
  createSave: {
    gameId: string
    saveId: string
    save: ISave
  }

  setSelectedBoss: {
    gameId: string
    saveId: string
    selectedBossId: string
  }
  incrementDeaths: {
    gameId: string
    saveId: string
    bossId: string
  }
  setBossTime: {
    gameId: string
    saveId: string
    bossId: string
    time: number
  }
}
const mutations: DefineMutations<ISavesMutations, ISavesState> = {
  toggleNewSaveOverlay (state, {showNewSaveOverlay}) {
    state.showNewSaveOverlay = showNewSaveOverlay
  },
  createSave (state, {gameId, saveId, save}) {
    // Use Vue.set because otherwise Vue cannot detect property addition
    Vue.set(state.saves[gameId], saveId, save)

    throttledSaveSave()
  },

  setSelectedBoss (state: ISavesState, {gameId, saveId, selectedBossId}) {
    state.saves[gameId][saveId].selected = selectedBossId
    throttledSaveSave()
  },
  incrementDeaths (state: ISavesState, {gameId, saveId, bossId}) {
    state.saves[gameId][saveId].bosses[bossId].deaths += 1
    throttledSaveSave()
  },
  setBossTime (state: ISavesState, {gameId, saveId, bossId, time}) {
    state.saves[gameId][saveId].bosses[bossId].time = time
    throttledSaveSave()
  }
}

interface ISavesGetters {
  deathsChartData: (gameId: string, saveId: string) => {chartData: ChartData, chartOptions: ChartOptions}
  timesChartData: (gameId: string, saveId: string) => {chartData: ChartData, chartOptions: ChartOptions}
}
const getters: DefineGetters<ISavesGetters, ISavesState> = {
  deathsChartData: (state) => (gameId, saveId) => {
    const labels = Object.values(state.saves[gameId][saveId].bosses).map(bossInfo => bossInfo.name)
    const deaths = Object.values(state.saves[gameId][saveId].bosses).map(bossInfo => bossInfo.deaths)
    return {
      chartData: {labels, datasets: [{
        label: '# of Deaths',
        data: deaths,
        backgroundColor: 'rgb(255, 0, 0)'
      }]},
      chartOptions: {
        scales: {xAxes: [{ticks: {
          min: 0
        }}]}
      }
    }
  },
  timesChartData: (state) => (gameId, saveId) => {
    const labels = Object.values(state.saves[gameId][saveId].bosses).map(bossInfo => bossInfo.name)
    const millisecondTimes = Object.values(state.saves[gameId][saveId].bosses).map(bossInfo => bossInfo.time)
    return {
      chartData: {labels, datasets: [{
        label: 'Boss time in hh:mm:ss',
        data: millisecondTimes,
        backgroundColor: 'rgb(0, 255, 0)',
        xAxisID: 'xAxis'
      }]},
      chartOptions: {
        tooltips: {
          callbacks: {
            label: (toolTipItem) => {
              const label = toolTipItem.xLabel ? toolTipItem.xLabel : ''
              return formatBossTime(Number.parseInt(label, 10), false)
            }
          }
        },
        scales: {
          xAxes: [{
            id: 'xAxis',
            type: 'linear',
            ticks: {
              min: 0,
              callback: value => {
                return formatBossTime(Number.parseInt(value, 10), false)
              }
            }
          }]
        }
      }
    }
  }
}

interface ISavesActions {
  createSave: {
    gameId: string,
    saveName: string
  }
}
const actions: DefineActions<ISavesActions, ISavesState, ISavesMutations> = {
  createSave ({commit, rootState}, {gameId, saveName}) {
    const gameData: IGame = rootState.games.games[gameId]
    const save = generateSave(saveName, gameData)
    const generatedSaveId: string = crypto.randomBytes(16).toString('hex')

    commit('createSave', {gameId: gameId, saveId: generatedSaveId, save})
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
  getters,
  actions
}
