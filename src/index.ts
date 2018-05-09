/* eslint-disable no-undef */
import * as page from './display/page-display'
import * as savesPage from './page/saves-page'
import * as savesDisplay from './display/save-display'

// Event listeners
// Detecting new save button presses
const newSaveButton: HTMLElement = document.getElementById('newSaveButton')
newSaveButton.addEventListener('click', savesDisplay.displayNewSaveOverlay)
// Detecting new save submits
const createSaveButton: HTMLElement = document.getElementById('createSaveButton')
createSaveButton.addEventListener('click', savesPage.newSaveClicked)
// Home button press
const homeButton: HTMLElement = document.getElementById('homeButton')
homeButton.addEventListener('click', page.displayHomePage)

page.displayHomePage()
