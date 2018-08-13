import * as fs from 'fs'
import * as path from 'path'

declare const __static: string
const dataPath = path.join(__static, 'storage', 'data.json')
const data: {games: IGames} = JSON.parse(fs.readFileSync(dataPath, 'UTF8'))

// data.json interface
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

// Functions
function getGames (): IGames {
  return data.games
}

function getGameInfo (gameId: string): IGame {
  return data.games[gameId]
}

export {getGames, getGameInfo, IGames}
