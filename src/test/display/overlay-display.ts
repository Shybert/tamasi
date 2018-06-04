/* eslint-env mocha */
/* eslint-disable no-undef */
import * as overlayDisplay from '../../display/overlay-display'
import * as chai from 'chai'
const assert = chai.assert

describe('overlay-display', async () => {
  describe('selectBoss()', async () => {
    let ul: HTMLElement
    beforeEach(() => {
      // Add enough elements for testing moving up/down list
      ul = document.createElement('ul')
      for (let i = 0; i < 3; i += 1) {
        ul.appendChild(document.createElement('li'))
      }
      ul.id = 'saveInfo'
      document.body.appendChild(ul)
    })
    afterEach(() => {
      document.body.innerHTML = ''
    })

    it('Should remove the active class from the element that had it', async () => {
      ul.firstElementChild.classList.add('active')
      overlayDisplay.selectBoss('next')

      assert.isFalse(ul.firstElementChild.classList.contains('active'), 'The active class was not removed from the element that had it')
    })
    it("Should add the active class to the previous element if direction is 'previous'", async () => {
      const lastElement: HTMLElement = ul.lastElementChild as HTMLElement
      lastElement.classList.add('active')
      overlayDisplay.selectBoss('previous')

      assert.isTrue(lastElement.previousElementSibling.classList.contains('active'),
        'The previous element did not have the active class')
    })
    it("Should add the active class to the next element if direction is 'next'", async () => {
      const firstElement: HTMLElement = ul.firstElementChild as HTMLElement
      firstElement.classList.add('active')
      overlayDisplay.selectBoss('next')

      assert.isTrue(firstElement.nextElementSibling.classList.contains('active'),
        'The next element did not have the active class')
    })
    it("Should add the active class to the last element if direction is 'previous' and it's at the top of the list", async () => {
      const firstElement: HTMLElement = ul.firstElementChild as HTMLElement
      firstElement.classList.add('active')
      overlayDisplay.selectBoss('previous')

      assert.isTrue(ul.lastElementChild.classList.contains('active'),
        'The last element did not have the active class')
    })
    it("Should add the active class to the first element if direction is 'next' and it's at the bottom of the list", async () => {
      const lastElement: HTMLElement = ul.lastElementChild as HTMLElement
      lastElement.classList.add('active')
      overlayDisplay.selectBoss('next')

      assert.isTrue(ul.firstElementChild.classList.contains('active'),
        'The first element did not have the active class')
    })
    it('Should stop the timer if it is runnning')
  })
})
