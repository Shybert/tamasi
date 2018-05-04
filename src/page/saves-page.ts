/* eslint-disable no-undef */
import * as Saves from '../storage/saves' // eslint-disable-line no-unused-vars
import * as display from '../display/display'
import * as page from './page'

// Fetch game ID and initialize saves class
const gameId: string = localStorage.getItem('gameId')
const saves = new Saves.Saves(gameId)

// Displaying new save overlay
async function displayNewSaveOverlay (): Promise<void> {
  try {
    console.log("Showing the 'new save' overlay")
    const newSaveOverlay: HTMLElement = document.getElementById('newSaveOverlay')
    newSaveOverlay.style.display = 'block'
  } catch (err) {
    console.error("Error while displaying the 'new save' overlay", err)
  }
}

// New save button clicked
async function newSaveClicked (): Promise<void> {
  try {
    const newSaveName: string = (document.getElementById('newSaveName') as HTMLInputElement).value
    await saves.createSave(newSaveName)

    // Re-display the save list
    displaySaveList()
    // Hide the overlay
    document.getElementById('newSaveOverlay').style.display = 'none'
    console.log("'New save' overlay hidden")
  } catch (err) {
    console.error('Error while submitting new save', err)
  }
}

// Displaying save list
async function displaySaveList (): Promise<void> {
  try {
    console.log('Displaying/Updating saves list')
    const saveList: HTMLElement = document.getElementById('saveList')

    // Clear current list of saves
    saveList.innerHTML = ''
    console.log('Removed old save list elements')

    // Fetch saves
    const savesObj: Saves.SavesList = await saves.getSaves()
    console.log()

    // Abort displaying if no saves have been created yet
    if (!savesObj) {
      console.log('No saves created yet')
      return
    }

    // Insert the elements
    Object.entries(savesObj).forEach(async ([saveId, save]): Promise<void> => {
      const li: HTMLElement = await display.addLiInfo(save.name, {id: saveId})

      // Listen for click for opening overlay
      li.addEventListener('click', (): void => {
        console.log('Save name clicked')
        // Set the save ID in localStorage so it can be found by the overlay
        window.localStorage.setItem('saveId', li.getAttribute('id'))
        page.displayOverlayPage()
      })

      saveList.appendChild(li)
    })
    console.log('Inserted save list elements')
  } catch (err) {
    console.error('Error when displaying save list', err)
  }
}

export {displaySaveList, displayNewSaveOverlay, newSaveClicked}
