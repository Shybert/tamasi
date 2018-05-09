/* eslint-disable no-undef */
import * as saves from '../storage/saves'
import * as saveDisplay from '../display/save-display'

// New save button clicked
async function newSaveClicked (): Promise<void> {
  try {
    const newSaveName: string = (document.getElementById('newSaveName') as HTMLInputElement).value
    const gameId: string = window.localStorage.getItem('gameId')
    await saves.createSave(gameId, newSaveName)

    // Re-display the save list
    const savesObj = await saves.getSaves(gameId)
    saveDisplay.displaySavesList(savesObj)
    // Hide the overlay
    document.getElementById('newSaveOverlay').style.display = 'none'
    console.log("'New save' overlay hidden")
  } catch (err) {
    console.error('Error while submitting new save', err)
  }
}

export {newSaveClicked}
