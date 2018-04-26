/* eslint-disable no-undef */
import * as display from './display'
import * as page from './page'
import * as data from '../storage/data'

async function displayGameList (): Promise<void> {
  try {
    console.log('Displaying list of games')
    // Get and clear current list
    const gamesList: HTMLElement = document.getElementById('gamesList')
    gamesList.innerHTML = ''
    console.log('Cleared gamesList element')

    // Fetch the list of game names
    const gameNames: Array<data.GameName> = await data.getGameNames()
    console.log('Fetched list of game names', gameNames)

    // Create the elements
    for (let i = 0; i < gameNames.length; i += 1) {
      const li: HTMLElement = await display.addLiInfo(gameNames[i].name, {id: gameNames[i].id})

      // Listening for clicks on the game names for opening the save window
      li.addEventListener('click', (): void => {
        const gameId: string = li.id
        localStorage.setItem('gameId', gameId)
        console.log(`Set game ID '${gameId}' in localStorage`)
        page.displaySavesPage()
      })

      gamesList.appendChild(li)
    }
    console.log('Appended new list of games')
  } catch (err) {
    console.error(`Error while displaying list of games: ${err}`)
  }
}

export {displayGameList}
