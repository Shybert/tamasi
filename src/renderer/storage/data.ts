const Store = require('electron-store')
const dataJSON = new Store({name: 'data', cwd: 'storage'})

// data.json interface
interface BossInfo {
  name: string
}

interface Bosses {
  [x: string]: BossInfo
}

interface Game {
  name: string,
  bosses: Bosses
}

interface Games {
  [x: string]: Game
}

interface GameName {
  id: string,
  name: string
}

// Functions
function getGameNames (): Array<GameName> {
  console.log('Fetching game names')
  const gameInfo: Games = dataJSON.get(`games`)
  const gameNames: Array<GameName> = []

  console.log('Putting names and IDs into an array')
  Object.entries(gameInfo).forEach(([key, value]): void => {
    const gameName: GameName = {
      id: key,
      name: value.name
    }
    gameNames.push(gameName)
  })

  return gameNames
}

function getGameInfo (gameId: string): Game {
  const gameInfo: Game = dataJSON.get(`games.${gameId}`)
  console.log('Fetched game info', gameInfo)
  return gameInfo
}

export {BossInfo, Bosses, Game, Games, GameName, getGameNames, getGameInfo}
