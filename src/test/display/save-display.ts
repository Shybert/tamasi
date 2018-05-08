/* eslint-env mocha */
/* eslint-disable no-undef */
import * as saveDisplay from '../../display/save-display'
import * as chai from 'chai'
const assert = chai.assert

describe('saveDisplay', async () => {
  describe('displayNewSaveOverlay()', async () => {
    beforeEach(async () => {
      const newSaveOverlay: HTMLElement = document.createElement('div')
      newSaveOverlay.id = 'newSaveOverlay'
      document.body.appendChild(newSaveOverlay)
    })
    afterEach(async () => {
      document.body.innerHTML = ''
    })

    it("Should set the display CSS value to 'block'", async () => {
      const newSaveOverlay: HTMLElement = document.getElementById('newSaveOverlay')
      // Change display CSS value now to make sure function also changes it
      newSaveOverlay.style.display = 'none'
      await saveDisplay.displayNewSaveOverlay()

      const actual: string = window.getComputedStyle(newSaveOverlay).getPropertyValue('display')
      const expected: string = 'block'

      assert.equal(actual, expected, "The CSS value of the new save overlay div was not 'block'")
    })
  })
})
