import * as saves from '../storage/saves' // eslint-disable-line no-unused-vars
import * as display from './display'
import * as page from './page-display'

async function displayNewSaveOverlay (): Promise<void> {
  try {
    console.log("Showing the 'new save' overlay")
    const newSaveOverlay: HTMLElement = document.getElementById('newSaveOverlay')
    newSaveOverlay.style.display = 'block'
  } catch (err) {
    console.error("Error while displaying the 'new save' overlay", err)
  }
}

async function displaySavesList (savesObj: saves.Saves): Promise<void> {
  try {
    console.log('Displaying/Updating saves list')
    const saveList: HTMLElement = document.getElementById('saveList')
    // Clear current list of saves
    saveList.innerHTML = ''
    console.log('Removed old save list elements')

    // Return if no saves have been created yet
    if (!savesObj) {
      console.log('No saves have been created yet for the game')
      return
    }

    // Insert the elements
    Object.entries(savesObj).forEach(async ([saveId, save]): Promise<void> => {
      const li: HTMLElement = await display.createLiWithInfo(save.name, {id: saveId})

      // Listen for click for opening overlay
      li.addEventListener('click', async (): Promise<void> => {
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

export {displayNewSaveOverlay, displaySavesList}
