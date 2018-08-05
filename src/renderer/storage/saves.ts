import * as crypto from 'crypto'
import * as data from './data'
const Store = require('electron-store')
const savesJSON = new Store({name: 'saves', cwd: 'storage'})

interface IBossInfo {
  name: string,
  time: number,
  deaths: number
}
interface IBosses {
  [x: string]: IBossInfo
}
interface ISaveInfo {
  name: string
  bosses: IBosses
  selected: string
}
interface ISaves {
  [x: string]: ISaveInfo
}

class Save {
  // Required properties
  private gameId: string
  private saveId: string
  private savePath: string
  constructor (theGameId: string, theSaveId: string) {
    this.gameId = theGameId
    this.saveId = theSaveId

    this.savePath = `games.${this.gameId}.${this.saveId}`
  }

  public getSaveInfo (): ISaveInfo {
    return savesJSON.get(this.savePath)
  }
  public setSaveInfo (saveInfo: ISaveInfo): void {
    console.log('Setting saveInfo')
    savesJSON.set(`${this.savePath}`, saveInfo)
  }
}

function getSaves (gameId: string): ISaves {
  return savesJSON.get(`games.${gameId}`)
}

function createSave (gameId: string, name: string): void {
  try {
    console.log('Creating a new save')

    let saveName: string = name
    const gameInfo = data.getGameInfo(gameId)
    const savePath: string = `games.${gameId}`
    // Generate an ID for the save
    const generatedSaveId: string = crypto.randomBytes(16).toString('hex')

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

    const bossList: IBosses = gameInfo.bosses as IBosses
    console.log('Imported boss list for the game')
    // Insert properties for each boss
    Object.keys(bossList).forEach((bossId: string): void => {
      bossList[bossId].time = 0
      bossList[bossId].deaths = 0
    })
    console.log('Inserted properties to each boss')

    // Insert the info
    const saveInfo: ISaveInfo = {
      name: saveName,
      bosses: bossList,
      selected: Object.keys(bossList)[0]
    }
    // Write the created save to saves.json
    savesJSON.set(`${savePath}.${generatedSaveId}`, saveInfo)
    console.log('Inserted new save information')

    console.log('Created new save')
  } catch (err) {
    console.error('Error while creating new save', err)
  }
}

export {getSaves, createSave, Save, ISaveInfo, ISaves}
