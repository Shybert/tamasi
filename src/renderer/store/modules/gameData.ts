import * as fs from 'fs'
import * as path from 'path'

// gameData.json interface
interface IGames {
  [x: string]: {
    name: string
    bosses: {
      [x: string]: {
        name: string
      }
    }
  }
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
