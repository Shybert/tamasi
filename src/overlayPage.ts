import * as saves from './interface/saves' // eslint-disable-line no-unused-vars
const Store = require('electron-store')
const storageSaves = new Store({name: 'saves', cwd: 'storage'})

// Fetch the save ID and game ID for saving
const gameId: string = window.localStorage.getItem('gameId')
const saveId: string = window.localStorage.getItem('saveId')
console.log('Game ID / Save ID', gameId, saveId)

// Check if game ID or save ID is undefined
if (!gameId || !saveId) {
  console.warn('Game ID or save ID missing!')
}

displaySaveInfo()

async function displaySaveInfo (): Promise<void> {
  try {
    const saveInfo: saves.Save = await storageSaves.get(`games.${gameId}.${saveId}`)
    console.log('Fetched save information', saveInfo)

    // Display the name of the save
    document.getElementById('saveName').innerHTML = saveInfo.name
    console.log('Displayed save name')

    // Display boss information
    const saveInfoElement: HTMLElement = document.getElementById('saveInfo')
    Object.values(saveInfo.bosses).forEach((bossInfo): void => {
      const liParent: HTMLElement = document.createElement('li')
      const ulBossInfo: HTMLElement = document.createElement('ul')

      // Append boss name
      const bossName: Text = document.createTextNode(`Name: ${bossInfo.name}`)
      const liBossName: HTMLElement = document.createElement('li')
      liBossName.appendChild(bossName)
      ulBossInfo.appendChild(liBossName)

      // Append timer
      const bossTime: Text = document.createTextNode(`Time: ${bossInfo.time}`)
      const liBossTime: HTMLElement = document.createElement('li')
      liBossTime.appendChild(bossTime)
      ulBossInfo.appendChild(liBossTime)

      // Append deaths
      const bossDeaths: Text = document.createTextNode(`Deaths: ${bossInfo.deaths}`)
      const liBossDeaths: HTMLElement = document.createElement('li')
      liBossDeaths.appendChild(bossDeaths)
      ulBossInfo.appendChild(liBossDeaths)

      liParent.appendChild(ulBossInfo)
      saveInfoElement.appendChild(liParent)
    })
    console.log('Displayed save information')
  } catch (err) {
    console.error('Error while displaying save information:', err)
  }
}
