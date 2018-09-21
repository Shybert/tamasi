import * as fs from 'fs'
import * as path from 'path'

// gameData.json interface
interface IBossInfo {
  name: string
}
interface IBosses {
  [x: string]: IBossInfo
}
interface IGame {
  name: string,
  bosses: IBosses
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
