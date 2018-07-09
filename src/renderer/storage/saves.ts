const Store = require('electron-store')
const savesJSON = new Store({name: 'saves', cwd: 'storage'})

interface BossInfo {
  name: string,
  time: number,
  deaths: number
}
interface Bosses {
  [x: string]: BossInfo
}
interface SaveInfo {
  name: string
  bosses: Bosses
}
interface Saves {
  [x: string]: SaveInfo
}

function getSaves (gameId: string): Saves {
  return savesJSON.get(`games.${gameId}`)
}

export {getSaves}
