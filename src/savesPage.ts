/* eslint-disable no-undef */
import * as saves from './interface/saves' // eslint-disable-line no-unused-vars
import * as storage from './storage'
import * as page from './page'

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
    await storage.createSave(newSaveName)

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
    const gameId: string = localStorage.getItem('gameId')

    // Clear current list of saves
    saveList.innerHTML = ''
    console.log('Removed old save list elements')

    // Fetch saves
    const savesObj: saves.Saves = await storage.getSaves(gameId)
    console.log()

    // Abort displaying if no saves have been created yet
    if (!savesObj) {
      console.log('No saves created yet')
      return
    }

    // Insert the elements
    Object.entries(savesObj).forEach(([saveId, save]): void => {
      const li: HTMLElement = document.createElement('li')
      const name: Text = document.createTextNode(save.name)
      li.appendChild(name)
      // Set ID of element to ID of save for opening the overlay
      li.setAttribute('id', saveId)
      saveList.appendChild(li)

      // Listen for click for opening overlay
      li.addEventListener('click', (): void => {
        console.log('Save name clicked')
        // Set the save ID in localStorage so it can be found by the overlay
        window.localStorage.setItem('saveId', li.getAttribute('id'))
        page.displayOverlayPage()
      })
    })
    console.log('Inserted save list elements')
  } catch (err) {
    console.error('Error when displaying save list', err)
  }
}

export {displaySaveList, displayNewSaveOverlay, newSaveClicked}
