import * as fs from 'fs'
import * as path from 'path'
import {Module} from 'vuex-smart-module'

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

class GamesState {
  games: IGames = data.games
}

export const games = new Module({
  state: GamesState
})
