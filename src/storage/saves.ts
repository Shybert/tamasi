/* eslint-disable no-undef */
import * as crypto from 'crypto'
import * as data from './data' // eslint-disable-line no-unused-vars
const Store = require('electron-store')
const savesJSON = new Store({name: 'saves', cwd: 'storage'})

// saves.json interface
interface BossInfo {
  name: string,
  time: number,
  deaths: number
}

interface Bosses {
  [x: string]: BossInfo
}

interface Save {
  name: string
  bosses: Bosses
}

interface Saves {
  [x: string]: Save
}
interface SavesList {
  [x: string]: Save
}

class SavesTEMPNAME {
  // Required properties
  private gameId: string
  private saveId: string
  private savePath: string
  constructor (theGameId: string, theSaveId?: string) {
    this.gameId = theGameId
    this.saveId = theSaveId

    this.savePath = `games.${this.gameId}.${this.saveId}`
  }

  public async getSaves (): Promise<SavesList> {
    try {
      return savesJSON.get(`games.${this.gameId}`)
    } catch (err) {
      console.error('Error while fetching list of saves:', err)
    }
  }

  public async getSaveInfo (): Promise<Save> {
    try {
      return savesJSON.get(this.savePath)
    } catch (err) {
      console.error('Error while fetching save info:', err)
    }
  }

  public async getBossTime (bossId: string): Promise<BossInfo['time']> {
    try {
      return savesJSON.get(`${this.savePath}.bosses.${bossId}.time`)
    } catch (err) {
      console.error('Error while fetching boss time:', err)
    }
  }
  public async setBossTime (bossId: string, time: number): Promise<void> {
    try {
      savesJSON.set(`${this.savePath}.bosses.${bossId}.time`, time)
    } catch (err) {
      console.error('Error while setting boss time:', err)
    }
  }

  public async getBossDeaths (bossId: string): Promise<BossInfo['deaths']> {
    try {
      return savesJSON.get(`${this.savePath}.bosses.${bossId}.deaths`)
    } catch (err) {
      console.error('Error while fetching boss deaths:', err)
    }
  }
  public async setBossDeaths (bossId: string, deaths: number): Promise<void> {
    try {
      savesJSON.set(`${this.savePath}.bosses.${bossId}.deaths`, deaths)
    } catch (err) {
      console.error('Error while setting boss deaths')
    }
  }
}

// Functions
async function getSaves (gameId: string): Promise<Saves> {
  try {
    console.log('Fetching list of saves')
    const saveList: Saves = await savesJSON.get(`games.${gameId}`)
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
    const gameInfo: data.Game = await data.getGameInfo(gameId)
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
    const bossList: Bosses = gameInfo.bosses as Bosses
    console.log('Imported boss list for the game')
    // Insert a 'time' property to each boss
    Object.keys(bossList).forEach((key: string): void => {
      bossList[key].time = 0
      bossList[key].deaths = 0
    })
    console.log('Inserted time and death property to each boss')

    // Insert the info
    const saveInfo: Save = {
      name: saveName,
      bosses: bossList
    }
    // Write the created save to saves.json
    savesJSON.set(`${savePath}.${saveId}`, saveInfo)
    console.log('Inserted new save information')

    console.log('Created new save')
  } catch (err) {
    console.error('Error while creating new save', err)
  }
}

export {BossInfo, Bosses, Save, Saves, SavesTEMPNAME, getSaves, createSave}
