/* eslint-env mocha */
import * as chai from 'chai'
import * as homeDisplay from '../../display/home-display'
import * as data from '../../storage/data' // eslint-disable-line no-unused-vars
const assert = chai.assert

describe('home-display', async () => {
  describe('displayGameList()', async () => {
    const gameNames: Array<data.GameName> = [{id: '1', name: '1'}, {id: '2', name: '2'}, {id: '3', name: '3'}]
    let element: HTMLElement
    beforeEach(async () => {
      // Create the ul element that the function appends to
      const ul: HTMLElement = document.createElement('ul')
      ul.id = 'gamesList'
      document.getElementsByTagName('body')[0].appendChild(ul)
      element = document.getElementById('gamesList')
    })
    afterEach(async () => {
      // Clear the body for the next test
      document.getElementsByTagName('body')[0].innerHTML = ''
      // Clean up localStorage for the next test
      window.localStorage.clear()
    })

    it('Should clear the current list of games', async () => {
      // Append a div to the element to check if it gets cleared
      const div: HTMLElement = document.createElement('div')
      div.id = 'id'
      element.appendChild(document.createElement('div'))

      await homeDisplay.displayGameList(gameNames)
      assert.isNull(document.getElementById('id'), 'The added div was not cleared from the list element')
    })
    it('Should append an li for each game', async () => {
      await homeDisplay.displayGameList(gameNames)

      assert.equal(element.children.length, 3, 'The ul did not have the correct amount of elements')
      for (let i = 0; i < element.children.length; i += 1) {
        assert.equal(element.children[i].tagName, 'LI', 'An appended element was not an li element')
      }
    })
    it('Should add an event listener to each li element')
    it('Should set the ID of the game in localStorage when clicking the li elements')
  })
})
