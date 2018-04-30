/* eslint-disable no-undef */
import {ipcRenderer} from 'electron'
import * as homePage from './home-page'
import * as savesPage from './saves-page'
import * as display from './display'

async function displayHomePage () {
  try {
    console.log('Displaying home page')

    display.hidePages()

    // (Re)load the list of games
    homePage.displayGameList()
    console.log('(Re)loaded games list')

    // Display home page
    document.getElementById('home').style.display = 'block'
    console.log('Displayed home page')
  } catch (err) {
    console.error(`Error while displaying home page: ${err}`)
  }
}

async function displaySavesPage () {
  try {
    console.log('Displaying saves page')

    display.hidePages()

    // Display saves page
    savesPage.displaySaveList()
    document.getElementById('saves').style.display = 'block'
    console.log('Displayed saves page')
  } catch (err) {
    console.error('Error while displaying saves page', err)
  }
}

async function displayOverlayPage () {
  try {
    console.log('Displaying overlay')

    // Send load overlay message to main process
    ipcRenderer.send('loadOverlay')
  } catch (err) {
    console.error('Error while displaying overlay:', err)
  }
}

export {displayHomePage, displaySavesPage, displayOverlayPage}
