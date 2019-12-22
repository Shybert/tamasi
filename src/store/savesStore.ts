import { createStore } from './store'
import { games } from './gamesData'
import * as crypto from 'crypto'

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

function generateSave(gameId: string, saveName: string): ISave {
  const bossList = games[gameId].bosses as ISaveBosses
  // Insert properties for each boss
  Object.keys(bossList).forEach(bossId => {
    bossList[bossId].time = 0
    bossList[bossId].deaths = 0
  })

  const save: ISave = {
    gameId,
    name: saveName,
    bosses: bossList,
    selected: Object.keys(bossList)[0]
  }
  return save
}

interface ISavesState {
  saves: ISaves

  // Temporary. Used to force a rerender when adding a new save.
  // Property addition is not reactive because of Vue 2 limitations.
  // Can be removed when switching to Vue 3
  forceRerender: number
}
const savesState: ISavesState = {
  saves: {},
  forceRerender: 0
}

export function useSavesStore() {
  return createStore(savesState)
}

export function createSave(gameId: string, saveName: string): void {
  const store = useSavesStore()
  const save: ISave = generateSave(gameId, saveName)
  const saveId: string = crypto.randomBytes(16).toString('hex')
  store.state.value.saves[saveId] = save
  store.state.value.forceRerender += 1
}
