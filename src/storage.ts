/* eslint-disable no-undef */
const Store = require('electron-store')
const store = new Store({name: 'data', cwd: 'storage'})

interface GameName {
  id: string,
  name: string
}
interface GameInfo {
  name: string
  bosses: Object
}

// Initially getting all game info
console.log('Fetching game info')
const gameInfo: Object = store.get('games')
console.log('Fetched game info')

async function getGameNames (): Promise<Array<GameName>> {
  try {
    console.log('Fetching game names')
    const gameNames: Array<GameName> = []

    console.log('Putting names and IDs into an array')
    Object.entries(gameInfo).forEach(([key, value]): void => {
      const gameName: GameName = {
        id: key,
        name: value.name
      }
      gameNames.push(gameName)
    })

    console.log('Finished fetching game names')
    return gameNames
  } catch (err) {
    console.log(`Error while fetching game info: ${err}`)
  }
}

// Exports
export {getGameNames, GameName}
