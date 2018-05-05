import {remote} from 'electron'
import * as Saves from '../storage/saves' // eslint-disable-line no-unused-vars
import {Timer} from '../timer'
import * as display from '../display/display'

// Fetch the save ID and game ID for saving
const gameId: string = window.localStorage.getItem('gameId')
const saveId: string = window.localStorage.getItem('saveId')
console.log('Game ID / Save ID', gameId, saveId)
// Initialize timer with the fetched game ID / save ID
// Initalize saves class
const timer = new Timer(gameId, saveId)
const saves = new Saves.Save(gameId, saveId)

// Check if game ID or save ID is undefined
if (!gameId || !saveId) {
  console.warn('Game ID or save ID missing!')
}

// Register keyboard shortcuts
// try/catch the entire thing?
remote.globalShortcut.register('PageUp', async (): Promise<void> => {
  selectBoss('previous')
})
remote.globalShortcut.register('PageDown', async (): Promise<void> => {
  selectBoss('next')
})
remote.globalShortcut.register('Home', async (): Promise<void> => {
  console.log('Increase death counter button pressed')
  // Get the ID of the currently selected boss
  const currentlySelectedBoss: HTMLElement = document.getElementsByClassName('active')[0] as HTMLElement // eslint-disable-line no-undef
  const bossId: string = currentlySelectedBoss.id
  console.log('Currently selected boss:', bossId)

  // Increase death counter and get new death count
  const newDeathCount: number = await saves.getBossDeaths(bossId) + 1
  saves.setBossDeaths(bossId, newDeathCount)
  // Display new death amount
  currentlySelectedBoss.getElementsByClassName('deaths')[0].innerHTML = `Deaths: ${newDeathCount}`
  console.log('New death count displayed', newDeathCount)
})
remote.globalShortcut.register('End', async (): Promise<void> => {
  console.log('Switch timer button pressed')
  // Get the correct timer element and boss ID
  const timerElement: HTMLElement = document.getElementsByClassName('active')[0].getElementsByClassName('time')[0] as HTMLElement // eslint-disable-line no-undef
  const bossId: string = document.getElementsByClassName('active')[0].id
  timer.switch(timerElement, bossId)
})

displaySaveInfo()

async function displaySaveInfo (): Promise<void> {
  try {
    const saveInfo: Saves.SaveInfo = await saves.getSaveInfo()
    console.log('Fetched save information', saveInfo)

    // Display the name of the save
    document.getElementById('saveName').innerHTML = saveInfo.name
    console.log('Displayed save name')

    // Display boss information
    const saveInfoElement: HTMLElement = document.getElementById('saveInfo')
    Object.entries(saveInfo.bosses).forEach(async ([bossId, bossInfo], index): Promise<void> => {
      const liParent: HTMLElement = document.createElement('li')
      const ulBossInfo: HTMLElement = document.createElement('ul')

      // Append boss info
      ulBossInfo.appendChild(await display.addLiInfo(`Name: ${bossInfo.name}`, {theClass: 'name'}))
      ulBossInfo.appendChild(await display.addLiInfo(`Time: ${await display.formatTime(bossInfo.time)}`, {theClass: 'time'}))
      ulBossInfo.appendChild(await display.addLiInfo(`Deaths: ${bossInfo.deaths}`, {theClass: 'deaths'}))

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
    // Make sure timer has been stopped
    timer.stop(liWithActiveClass.id)
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
