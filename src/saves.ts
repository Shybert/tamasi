/* eslint-disable no-undef */
import {remote} from 'electron'
import * as saves from './interface/saves' // eslint-disable-line no-unused-vars
import * as storage from './storage'

// Getting the global game ID
const id: string = remote.getGlobal('sharedObject').id
console.log(`Global game ID: ${id}`)

// Call function for displaying save list
displaySaveList()

// Detecting new save button presses
const newSaveButton: HTMLElement = document.getElementById('newSaveButton')
newSaveButton.addEventListener('click', (): void => {
  console.log('New save button pressed')
  const newSaveOverlay: HTMLElement = document.getElementById('newSaveOverlay')

  console.log('Showing the new save overlay')
  newSaveOverlay.style.display = 'block'
})

// Detecting new save submits
const createSaveButton: HTMLElement = document.getElementById('createSaveButton')
createSaveButton.addEventListener('click', async (): Promise<void> => {
  console.log('New save creation')
  const newSaveName: string = (document.getElementById('newSaveName') as HTMLInputElement).value
  await storage.createSave(newSaveName)

  // Re-display the save list
  displaySaveList()
  // Hide the overlay
  document.getElementById('newSaveOverlay').style.display = 'none'
  console.log('New save overlay hidden')
})

// Function for displaying save list
async function displaySaveList () {
  console.log('Displaying/Updating saves list')
  const saves: Array<saves.Save> = await storage.getSaves(id)
  const saveList: HTMLElement = document.getElementById('saveList')
  saveList.innerHTML = ''
  console.log('Removed old save list elements')

  // Check if game has been inserted yet / any saves have been made
  if (!saves || saves.length === 0) {
    console.log('No saves created yet')
    return
  }

  for (let i = 0; i < saves.length; i += 1) {
    const li: HTMLElement = document.createElement('li')
    const name: Text = document.createTextNode(saves[i].name)
    li.appendChild(name)
    saveList.appendChild(li)
  }
  console.log('Inserted save list elements')
}
