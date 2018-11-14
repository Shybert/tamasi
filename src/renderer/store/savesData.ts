import * as fs from 'fs'
import * as path from 'path'
import {remote} from 'electron'
import throttle from 'lodash/throttle'
import {sync as writeFileAtomicSync} from 'write-file-atomic'

// Saves interface
export interface ISaveBossInfo {
  name: string
  time: number
  deaths: number
}
export interface ISaveBosses {
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
interface ISavesData {
  games: ISaves
}

// Reading file
const savesPath: string = path.join(remote.app.getPath('userData'), 'storage', 'saves.json')
function loadSavesData (): ISavesData {
  try {
    const savesData = fs.readFileSync(savesPath, 'UTF8')
    return JSON.parse(savesData)
  } catch (err) {
    const plainObject = Object.create(null)
    plainObject.games = {}
    return plainObject
  }
}
const savesData = loadSavesData()
export const saves: ISaves = savesData.games

// Writing file
function unthrottledSaveSaves (): void {
  writeFileAtomicSync(savesPath, JSON.stringify(savesData, null, '\t'))
}
export const saveSaves = throttle(unthrottledSaveSaves, 5000)
