/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import {remote} from 'electron'
import * as data from './interface/data'
import * as saves from './interface/saves'
const Store = require('electron-store')
const storageData = new Store({name: 'data', cwd: 'storage'})
const storageSaves = new Store({name: 'saves', cwd: 'storage'})

interface GameName {
  id: string,
  name: string
}

// Initially getting all game info
console.log('Fetching game info')
const gameInfo: data.Games = storageData.get('games')
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

async function getSaves (gameId: string): Promise<Array<saves.Save>> {
  console.log('Fetching list of saves')
  return storageSaves.get(`games.${gameId}`)
}

async function createSave (name: string): Promise<void> {
  try {
    const gameId: string = remote.getGlobal('sharedObject').id
    const savePath: string = `games.${gameId}`
    console.log(`Creating new save with the name '${name}' for game ID '${gameId}'`)

    // Check if game has had an entry yet
    if (!storageSaves.has(savePath)) {
      console.log("Game hasn't been inserted yet")
      storageSaves.set(savePath, [])
      console.log('Initialized game')
    }

    // Import boss list for the game
    const bossList: saves.Bosses = storageData.get(`games.${gameId}.bosses`)
    console.log('Imported boss list for the game')
    // Insert a 'time' property to each boss
    Object.keys(bossList).forEach((key: string): void => {
      bossList[key].time = 0
    })
    console.log('Inserted time property to each boss')

    // Insert the info
    const saveInfo: saves.Save = {
      name,
      bosses: bossList
    }
    // Fetching the saves array, pushing to it, and then inserting it again
    const saves = storageSaves.get(savePath)
    saves.push(saveInfo)
    storageSaves.set(savePath, saves)

    console.log('Created new save')
  } catch (err) {
    console.log(`Error while creating new save: ${err}`)
  }
}

// Exports
export {getGameNames, getSaves, createSave, GameName}
