/* eslint-disable no-undef */
import * as saves from './interface/saves' // eslint-disable-line no-unused-vars
import * as storage from './storage'

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
    const gameId: string = sessionStorage.getItem('gameId')

    // Clear current list of saves
    saveList.innerHTML = ''
    console.log('Removed old save list elements')

    // Fetch the array of saves
    const saves: Array<saves.Save> = await storage.getSaves(gameId)
    console.log('Fetched new array of saves', saves)

    // Check if game has been inserted yet / any saves have been made
    if (!saves || saves.length === 0) {
      console.log('No saves created yet')
      return
    }

    // Insert the elements
    for (let i = 0; i < saves.length; i += 1) {
      const li: HTMLElement = document.createElement('li')
      const name: Text = document.createTextNode(saves[i].name)
      li.appendChild(name)
      saveList.appendChild(li)
    }
    console.log('Inserted save list elements')
  } catch (err) {
    console.error('Error when displaying save list', err)
  }
}

export {displaySaveList, displayNewSaveOverlay, newSaveClicked}
