import * as display from './display'
import * as page from '../page/page'
import * as data from '../storage/data' // eslint-disable-line no-unused-vars

export async function displayGameList (gameNames: Array<data.GameName>): Promise<void> {
  try {
    console.log('Displaying list of games')
    // Get and clear current list
    const gamesList: HTMLElement = document.getElementById('gamesList')
    gamesList.innerHTML = ''
    console.log('Cleared gamesList element')

    // Create the elements
    for (let i = 0; i < gameNames.length; i += 1) {
      const li: HTMLElement = await display.createLiWithInfo(gameNames[i].name, {id: gameNames[i].id})

      // Listening for clicks on the game names for opening the save window
      li.addEventListener('click', (): void => {
        const gameId: string = li.id
        window.localStorage.setItem('gameId', gameId)
        console.log(`Set game ID '${gameId}' in localStorage`)
        page.displaySavesPage()
      })

      gamesList.appendChild(li)
    }
    console.log('Appended new list of games')
  } catch (err) {
    console.error('Error while displaying game list:', err)
  }
}
