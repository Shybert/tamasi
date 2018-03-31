import * as home from './home'

async function displayHomePage () {
  try {
    console.log('Displaying home page')

    // Hide other pages
    document.getElementById('saves').style.display = 'none'
    console.log('Hid other pages')

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

export {displayHomePage}
