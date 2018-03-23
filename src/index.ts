/* eslint-disable no-undef */
import * as storage from './storage'
import {ipcRenderer} from 'electron'

interface GameNameClick extends Event {
  target: HTMLElement & EventTarget
}

displayGameList()

async function displayGameList (): Promise<void> {
  try {
    // Get the list of game names
    const gameNames: Array<storage.GameName> = await storage.getGameNames()

    // Create the elements
    console.log('Creating game name elements')
    const gamesList: HTMLElement = document.getElementById('gamesList')
    for (let i = 0; i < gameNames.length; i += 1) {
      const li: HTMLElement = document.createElement('li')
      const text: Text = document.createTextNode(gameNames[i].name)
      li.setAttribute('id', gameNames[i].id)
      li.appendChild(text)

      // Listening for clicks on the game names for opening the save window
      li.addEventListener('click', (event: GameNameClick): void => {
        const id: string = event.target.id
        console.log(`Game with ID '${id}' clicked`)
        // Send the ID of the clicked name to main.js
        ipcRenderer.send('openSaveWindow', id)
      })

      gamesList.appendChild(li)
    }
  } catch (err) {
    console.log(`Error while displaying list of games: ${err}`)
  }
}
