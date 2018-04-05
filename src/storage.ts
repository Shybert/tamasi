/* eslint-disable no-undef */
import * as crypto from 'crypto'
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

    return gameNames
  } catch (err) {
    console.error('Error while fetching game info:', err)
  }
}

async function getSaves (gameId: string): Promise<saves.Saves> {
  try {
    console.log('Fetching list of saves')
    const saveList: saves.Saves = await storageSaves.get(`games.${gameId}`)
    console.log('Fetched list of saves', saveList)
    return saveList
  } catch (err) {
    console.error('Error while fetching list of saves:', err)
  }
}

async function createSave (name: string): Promise<void> {
  try {
    console.log('Creating a new save')

    let saveName: string = name
    const gameId: string = localStorage.getItem('gameId')
    const gameInfo: data.Game = storageData.get(`games.${gameId}`)
    const savePath: string = `games.${gameId}`
    // Generate an ID for the save
    const saveId: string = crypto.randomBytes(16).toString('hex')

    // Check if a name has been provided
    if (!saveName) {
      // No name provided for save, use default name
      console.log('No name provided for save')
      saveName = gameInfo.name
    }

    // Abort save creation if boss list is empty
    if (!gameInfo.bosses) {
      console.log('Boss list for game is empty, aborting save creation')
      return
    }

    // Import boss list for the game
    const bossList: saves.Bosses = gameInfo.bosses as saves.Bosses
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
    // Write the created save to saves.json
    storageSaves.set(`${savePath}.${saveId}`, saveInfo)
    console.log('Inserted new save information')

    console.log('Created new save')
  } catch (err) {
    console.error('Error while creating new save', err)
  }
}

// Exports
export {getGameNames, getSaves, createSave, GameName}
