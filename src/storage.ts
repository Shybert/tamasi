/* eslint-disable no-undef */
import {remote} from 'electron'
import * as data from './interface/data' // eslint-disable-line no-unused-vars
import * as saves from './interface/saves' // eslint-disable-line no-unused-vars
const Store = require('electron-store')
const storageData = new Store({name: 'data', cwd: 'storage'})
const storageSaves = new Store({name: 'saves', cwd: 'storage'})

interface GameName {
  id: string,
  name: string
}

async function getGameNames (): Promise<Array<GameName>> {
  try {
    console.log('Fetching game names')
    const gameInfo: data.Games = storageData.get(`games`)
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
    console.error(`Error while fetching game info: ${err}`)
  }
}

async function getSaves (gameId: string): Promise<Array<saves.Save>> {
  try {
    console.log('Fetching list of saves')
    return storageSaves.get(`games.${gameId}`)
  } catch (err) {
    console.error(`Error while fetching list of saves: ${err}`)
  }
}

async function createSave (name: string): Promise<void> {
  try {
    console.log('Creating a new save')

    let saveName: string = name
    const gameId: string = remote.getGlobal('sharedObject').id
    const gameInfo: data.Game = storageData.get(`games.${gameId}`)
    const savePath: string = `games.${gameId}`

    // Check if a name has been provided
    if (!saveName) {
      // No name provided for save, use default name
      console.log('No name provided for save')
      saveName = gameInfo.name
    }

    // Check if game has had an entry yet
    if (!storageSaves.has(savePath)) {
      console.log("Game hasn't been inserted yet")
      storageSaves.set(savePath, [])
      console.log('Initialized game')
    }

    // Import boss list for the game
    const bossList: saves.Bosses = gameInfo.bosses as saves.Bosses // eslint-disable-line no-use-before-define
    console.log('Imported boss list for the game')
    // Insert a 'time' property to each boss
    Object.keys(bossList).forEach((key: string): void => {
      bossList[key].time = 0
    })
    console.log('Inserted time property to each boss')

    // Insert the info
    const saveInfo: saves.Save = {
      name: saveName,
      bosses: bossList
    }
    // Fetching the saves array, pushing to it, and then inserting it again
    const saves = storageSaves.get(savePath)
    saves.push(saveInfo)
    storageSaves.set(savePath, saves)
    console.log('Inserted new save info')

    console.log('Created new save')
  } catch (err) {
    console.error(`Error while creating new save: ${err}`)
  }
}

// Exports
export {getGameNames, getSaves, createSave, GameName}
