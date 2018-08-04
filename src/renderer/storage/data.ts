const Store = require('electron-store')
const dataJSON = new Store({name: 'data', cwd: 'storage'})

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
  const games: IGames = dataJSON.get(`games`)
  console.log('Fetched games', games)
  return games
}

function getGameInfo (gameId: string): IGame {
  const gameInfo: IGame = dataJSON.get(`games.${gameId}`)
  console.log('Fetched game info', gameInfo)
  return gameInfo
}

export {getGames, getGameInfo, IGames}
