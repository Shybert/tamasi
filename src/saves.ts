/* eslint-disable no-undef */
import {remote} from 'electron'

// Getting the global game ID
const id: string = remote.getGlobal('sharedObject').id
console.log(`Global game ID: ${id}`)

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
createSaveButton.addEventListener('click', (): void => {
  console.log('New save creation')
  const newSaveName: string = (document.getElementById('newSaveName') as HTMLInputElement).value
  console.log(`New save name: ${newSaveName}`)
})
