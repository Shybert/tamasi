import * as Saves from '../storage/saves' // eslint-disable-line no-unused-vars

async function displayNewSaveOverlay (): Promise<void> {
  try {
    console.log("Showing the 'new save' overlay")
    const newSaveOverlay: HTMLElement = document.getElementById('newSaveOverlay')
    newSaveOverlay.style.display = 'block'
  } catch (err) {
    console.error("Error while displaying the 'new save' overlay", err)
  }
}

export {displayNewSaveOverlay}
