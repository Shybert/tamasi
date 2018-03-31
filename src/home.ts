/* eslint-disable no-undef */
import * as storage from './storage'

// Extend the event interface to be able to get the ID of the selected element
interface GameNameClick extends Event {
  target: HTMLElement & EventTarget
}

async function displayGameList (): Promise<void> {
  try {
    console.log('Displaying list of games')
    // Get and clear current list
    const gamesList: HTMLElement = document.getElementById('gamesList')
    gamesList.innerHTML = ''
    console.log('Cleared gamesList element')

    // Fetch the list of game names
    const gameNames: Array<storage.GameName> = await storage.getGameNames()
    console.log('Fetched list of game names', gameNames)

    // Create the elements
    for (let i = 0; i < gameNames.length; i += 1) {
      const li: HTMLElement = document.createElement('li')
      const text: Text = document.createTextNode(gameNames[i].name)
      li.setAttribute('id', gameNames[i].id)
      li.appendChild(text)

      // Listening for clicks on the game names for opening the save window
      li.addEventListener('click', (event: GameNameClick): void => {
        const id: string = event.target.id
        console.log(`Game with ID '${id}' clicked`)
        // Open save window...
        //
        //
      })

      gamesList.appendChild(li)
    }
    console.log('Appended new list of games')
  } catch (err) {
    console.error(`Error while displaying list of games: ${err}`)
  }
}

export {displayGameList}
