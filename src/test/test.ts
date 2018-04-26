/* eslint-env mocha */
import * as display from '../page/display'
import * as chai from 'chai'
const assert = chai.assert

describe('Display', async () => {
  describe('addLiInfo()', async () => {
    it('Should return an li element', async () => {
      const returnedLi: HTMLElement = await display.addLiInfo('')

      // Convert node name to lowercase since nodeName returns uppercase
      assert.isTrue(returnedLi.nodeName.toLowerCase() === 'li', 'The returned element was not an li element')
    })
    it('Should append the provided text to the li', async () => {
      const text: string = 'text'
      const returnedLi: HTMLElement = await display.addLiInfo(text)

      assert.equal(returnedLi.innerHTML, text, 'The text in innerHTML did not equal the text provided to the function')
    })
    it('Should not add a class or an ID if they are not provided', async () => {
      const returnedLi: HTMLElement = await display.addLiInfo('')

      assert.isTrue(returnedLi.classList.length === 0 && returnedLi.hasAttribute('id') === false, "The returned li contained a class or an ID, even though it wasn't provided")
    })
    it('Should add the provided class to the li', async () => {
      const exampleClass: string = 'class'
      const returnedLi: HTMLElement = await display.addLiInfo('', {theClass: exampleClass})

      assert.isTrue(returnedLi.classList.contains(exampleClass), 'The returned li did not contain the provided class')
    })
    it('Should add the provided ID to the li', async () => {
      const id: string = 'id'
      const returnedLi: HTMLElement = await display.addLiInfo('', {id: id})

      assert.equal(returnedLi.id, id, 'The returned li did not contain the provided ID')
    })
    it('Should add both an ID and a class if both are provided', async () => {
      const id: string = 'id'
      const exampleClass: string = 'class'
      const returnedLi: HTMLElement = await display.addLiInfo('', {id: id, theClass: exampleClass})

      assert.isTrue(returnedLi.classList.contains(exampleClass) && returnedLi.id === id, 'The returned li did not contain the ID or the class provided')
    })
  })
})
