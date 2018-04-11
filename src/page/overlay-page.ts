import {remote} from 'electron'
import * as saves from '../storage/saves' // eslint-disable-line no-unused-vars

// Fetch the save ID and game ID for saving
const gameId: string = window.localStorage.getItem('gameId')
const saveId: string = window.localStorage.getItem('saveId')
console.log('Game ID / Save ID', gameId, saveId)

// Check if game ID or save ID is undefined
if (!gameId || !saveId) {
  console.warn('Game ID or save ID missing!')
}

// Register keyboard shortcuts
// try/catch the entire thing?
remote.globalShortcut.register('PageUp', (): void => {
  selectBoss('previous')
})
remote.globalShortcut.register('PageDown', (): void => {
  selectBoss('next')
})

displaySaveInfo()

async function displaySaveInfo (): Promise<void> {
  try {
    const saveInfo: saves.Save = await saves.getSaveInfo(gameId, saveId)
    console.log('Fetched save information', saveInfo)

    // Display the name of the save
    document.getElementById('saveName').innerHTML = saveInfo.name
    console.log('Displayed save name')

    // Display boss information
    const saveInfoElement: HTMLElement = document.getElementById('saveInfo')
    Object.entries(saveInfo.bosses).forEach(([bossId, bossInfo], index): void => {
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

      // Add boss ID as the ID of the parent li
      liParent.id = bossId

      liParent.appendChild(ulBossInfo)
      saveInfoElement.appendChild(liParent)

      // Set boss as active if it is the first boss
      if (index === 0) {
        liParent.classList.add('active')
        console.log('Set first boss as active boss')
      }
    })
    console.log('Displayed save information')
  } catch (err) {
    console.error('Error while displaying save information:', err)
  }
}

async function selectBoss (direction: 'previous' | 'next'): Promise<void> {
  try {
    console.log(`Selecting ${direction} boss`)

    // Find the element with the active class
    const liWithActiveClass: HTMLElement = document.getElementsByClassName('active')[0] as HTMLElement // eslint-disable-line no-undef
    // Remove 'active' class
    liWithActiveClass.classList.remove('active')

    // Check which direction to move in the list
    if (direction === 'previous') {
      // Add 'active' class to the previous element
      liWithActiveClass.previousElementSibling.classList.add('active')
    } else if (direction === 'next') {
      // Add 'active' class to the next element
      liWithActiveClass.nextElementSibling.classList.add('active')
    }

    console.log(`Selected ${direction} boss`)
  } catch (err) {
    console.error(`Error while selecting ${direction} boss:`, err)
  }
}
