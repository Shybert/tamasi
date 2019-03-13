import Vue from 'vue'
import {Store} from 'vuex'
import {Getters, Mutations, Actions, Module, Context} from 'vuex-smart-module'
import {games, IGame} from './games'
import * as crypto from 'crypto'
import {ChartData, ChartOptions} from 'chart.js'
import * as savesData from '../savesData'
import formatBossTime from '../../utils/formatBossTime'

class SavesState {
  showNewSaveOverlay: boolean = false
  saves: savesData.ISaves = savesData.saves
}

class SavesMutations extends Mutations<SavesState> {
  toggleNewSaveOverlay (payload: {showNewSaveOverlay: boolean}) {
    this.state.showNewSaveOverlay = payload.showNewSaveOverlay
  }
  writeSave (payload: {gameId: string, saveId: string, save: savesData.ISave}) {
    // Use Vue.set because otherwise Vue cannot detect property addition
    if (!(payload.gameId in this.state.saves)) Vue.set(this.state.saves, payload.gameId, {})
    Vue.set(this.state.saves[payload.gameId], payload.saveId, payload.save)

    savesData.saveSaves()
  }

  setSelectedBoss (payload: {gameId: string, saveId: string, selectedBossId: string}) {
    this.state.saves[payload.gameId][payload.saveId].selected = payload.selectedBossId
    savesData.saveSaves()
  }
  incrementDeaths (payload: {gameId: string, saveId: string, bossId: string}) {
    this.state.saves[payload.gameId][payload.saveId].bosses[payload.bossId].deaths += 1
    savesData.saveSaves()
  }
  decrementDeaths (payload: {gameId: string, saveId: string, bossId: string}) {
    if (this.state.saves[payload.gameId][payload.saveId].bosses[payload.bossId].deaths <= 0) return
    this.state.saves[payload.gameId][payload.saveId].bosses[payload.bossId].deaths -= 1
    savesData.saveSaves()
  }
  setBossTime (payload: {gameId: string, saveId: string, bossId: string, time: number}) {
    this.state.saves[payload.gameId][payload.saveId].bosses[payload.bossId].time = payload.time
    savesData.saveSaves()
  }
}

class SavesGetters extends Getters<SavesState> {
  deathsChartData (gameId: string, saveId: string): {chartData: ChartData, chartOptions: ChartOptions} {
    const labels = Object.values(this.state.saves[gameId][saveId].bosses).map(bossInfo => bossInfo.name)
    const deaths = Object.values(this.state.saves[gameId][saveId].bosses).map(bossInfo => bossInfo.deaths)
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
  }
  timesChartData (gameId: string, saveId: string): {chartData: ChartData, chartOptions: ChartOptions} {
    const labels = Object.values(this.state.saves[gameId][saveId].bosses).map(bossInfo => bossInfo.name)
    const millisecondTimes = Object.values(this.state.saves[gameId][saveId].bosses).map(bossInfo => bossInfo.time)
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

class SavesActions extends Actions<SavesState, SavesGetters, SavesMutations, SavesActions> {
  games!: Context<typeof games>
  $init (store: Store<any>): void {
    // Create and retain games module context
    this.games = games.context(store)
  }

  async createSave (payload: {gameId: string, saveName: string}): Promise<void> {
    const save = generateSave(payload.saveName, this.games.state.games[payload.gameId])
    const generatedSaveId: string = crypto.randomBytes(16).toString('hex')

    this.commit('writeSave', {gameId: payload.gameId, saveId: generatedSaveId, save})
  }
}

function generateSave (name: string, gameData: IGame): savesData.ISave {
  let saveName: string = name

  if (!saveName) {
    // No name provided for save, use default name
    saveName = gameData.name
  }

  const bossList = gameData.bosses as savesData.ISaveBosses
  // Insert properties for each boss
  Object.keys(bossList).forEach((bossId): void => {
    bossList[bossId].time = 0
    bossList[bossId].deaths = 0
  })

  // Insert the save info
  const save: savesData.ISave = {
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
  getters: SavesGetters,
  actions: SavesActions
})
