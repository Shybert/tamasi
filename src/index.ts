/* eslint-disable no-undef */
import * as page from './page'
import * as saves from './saves'

// New save creation event listeners
// Detecting new save button presses
const newSaveButton: HTMLElement = document.getElementById('newSaveButton')
newSaveButton.addEventListener('click', saves.displayNewSaveOverlay)
// Detecting new save submits
const createSaveButton: HTMLElement = document.getElementById('createSaveButton')
createSaveButton.addEventListener('click', saves.newSaveClicked)

page.displayHomePage()
