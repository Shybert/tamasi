import * as fs from 'fs'
import * as path from 'path'

// gameData.json interface
interface IGameBossInfo {
  name: string
}
interface IGameBosses {
  [x: string]: IGameBossInfo
}
export interface IGame {
  name: string
  bosses: IGameBosses
}
interface IGames {
  [x: string]: IGame
}

declare const __static: string
const gameDataPath = path.join(__static, 'storage', 'gameData.json')
const data: {games: IGames} = JSON.parse(fs.readFileSync(gameDataPath, 'UTF8'))

const state = {
  games: data.games
}

export default {
  state
}
