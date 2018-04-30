/* eslint-env mocha */
/* eslint-disable no-undef */
import * as display from '../page/display'
import * as chai from 'chai'
const assert = chai.assert

describe('Display', async () => {
  describe('addLiInfo()', async () => {
    let text: string
    let id: string
    let exampleClass: string
    before(() => {
      text = 'text'
      id = 'id'
      exampleClass = 'class'
    })

    it('Should return an li element', async () => {
      const returnedLi: HTMLElement = await display.addLiInfo('')

      // Convert node name to lowercase since nodeName returns uppercase
      assert.isTrue(returnedLi.nodeName.toLowerCase() === 'li', 'The returned element was not an li element')
    })
    it('Should append the provided text to the li', async () => {
      const returnedLi: HTMLElement = await display.addLiInfo(text)

      assert.equal(returnedLi.innerHTML, text, 'The text in innerHTML did not equal the text provided to the function')
    })
    it('Should not add a class or an ID if they are not provided', async () => {
      const returnedLi: HTMLElement = await display.addLiInfo('')

      assert.isTrue(returnedLi.classList.length === 0 && returnedLi.hasAttribute('id') === false, "The returned li contained a class or an ID, even though it wasn't provided")
    })
    it('Should add the provided class to the li', async () => {
      const returnedLi: HTMLElement = await display.addLiInfo('', {theClass: exampleClass})

      assert.isTrue(returnedLi.classList.contains(exampleClass), 'The returned li did not contain the provided class')
    })
    it('Should add the provided ID to the li', async () => {
      const returnedLi: HTMLElement = await display.addLiInfo('', {id: id})

      assert.equal(returnedLi.id, id, 'The returned li did not contain the provided ID')
    })
    it('Should add both an ID and a class if both are provided', async () => {
      const returnedLi: HTMLElement = await display.addLiInfo('', {id: id, theClass: exampleClass})

      assert.isTrue(returnedLi.classList.contains(exampleClass) && returnedLi.id === id, 'The returned li did not contain the ID or the class provided')
    })
  })

  describe('hidePages()', async () => {
    before(() => {
      // Set up div with ID set to 'content'
      const div: HTMLElement = document.createElement('div')
      div.id = 'content'
      document.getElementsByTagName('body')[0].appendChild(div)
    })

    it("Should set display to 'none' for all child nodes of the div with the ID 'content'", async () => {
      // Set up child nodes on the div with ID 'content
      const divContent: HTMLElement = document.getElementById('content')
      for (let i = 0; i < 3; i += 1) {
        divContent.appendChild(document.createElement('div'))
      }

      await display.hidePages()
      for (let i = 0; i < divContent.children.length; i += 1) {
        // Fail the test if display value has not been set to 'none'
        const actual: string = window.getComputedStyle((divContent.children)[i]).getPropertyValue('display')
        const expected: string = 'none'
        assert.equal(actual, expected, "Display value was not correctly set to 'none' for all three elements")
      }
    })

    after(() => {
      document.getElementsByTagName('body')[0].innerHTML = ''
    })
  })

  describe('selectBoss()', async () => {
    let body: HTMLElement
    beforeEach(() => {
      // Set up three divs for testing
      body = document.getElementsByTagName('body')[0]
      for (let i = 0; i < 3; i += 1) {
        const div: HTMLElement = document.createElement('div')
        body.appendChild(div)
      }
    })
    afterEach(() => {
      // Clear body.innerHTML to clean up created divs
      document.getElementsByTagName('body')[0].innerHTML = ''
    })
    // Functions for selecting the first/last element in the list
    async function setAndReturnFirst (): Promise<HTMLElement> {
      body.firstElementChild.classList.add('active')
      return (body.firstElementChild as HTMLElement)
    }
    async function setAndReturnLast (): Promise<HTMLElement> {
      body.lastElementChild.classList.add('active')
      return (body.lastElementChild as HTMLElement)
    }

    it('Should remove the active class from the div that currently has it', async () => {
      const activeElement: HTMLElement = await setAndReturnFirst()
      await display.selectBoss('next')
      assert.isFalse(activeElement.classList.contains('active'), 'The active class was not removed')
    })
    it("Should add the active class to the next element sibling if the parameter is 'next'", async () => {
      const activeElement: HTMLElement = await setAndReturnFirst()
      await display.selectBoss('next')
      assert.isTrue(activeElement.nextElementSibling.classList.contains('active'), "The next element sibling did not have the 'active' class")
    })
    it("Should add the active class to the previous element sibling if the parameter is 'previous'", async () => {
      const activeElement: HTMLElement = await setAndReturnLast()
      await display.selectBoss('previous')
      assert.isTrue(activeElement.previousElementSibling.classList.contains('active'), "The previous element sibling did not have the 'active' class")
    })
    it("Should add the active class to the first element sibling if the parameter is 'next' and there is no next element sibling", async () => {
      await setAndReturnLast()
      await display.selectBoss('next')
      assert.isTrue(body.firstElementChild.classList.contains('active'), "The first element child did not have the 'active' class")
    })
    it("Should add the active class to the last element sibling if the parameter is 'previous' and there is no previous element sibling", async () => {
      await setAndReturnFirst()
      await display.selectBoss('previous')
      assert.isTrue(body.lastElementChild.classList.contains('active'), "The last element child did not have the 'active' class")
    })
    it('Should add the active class to the first element sibling if there is no element with the active class', async () => {
      await display.selectBoss('next')
      assert.isTrue(body.firstElementChild.classList.contains('active'), "The first element child did not have the 'active' class")
    })
    it('Should stop the timer if it is running')
  })
})
