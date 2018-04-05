/* eslint-disable no-undef */
import {ipcRenderer} from 'electron'
import * as home from './home'
import * as saves from './saves'

async function displayHomePage () {
  try {
    console.log('Displaying home page')

    hidePages()

    // (Re)load the list of games
    home.displayGameList()
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

    hidePages()

    // Display saves page
    saves.displaySaveList()
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

// The single function for hiding all the pages
async function hidePages () {
  try {
    console.log('Hiding pages')

    // Fetch all child nodes for the 'content' div, since these are the pages
    const pages: HTMLCollection = document.getElementById('content').children
    // Loop through the pages and hide them
    for (let i = 0; i < pages.length; i += 1) {
      (pages[i] as HTMLElement).style.display = 'none'
    }
  } catch (err) {
    console.error('Error while hiding pages:', err)
  }
}

export {displayHomePage, displaySavesPage, displayOverlayPage}
