import {shallowMount} from '@vue/test-utils'
import Saves from '../../../src/renderer/components/Saves/Saves.vue'
import SaveList from '../../../src/renderer/components/Saves/SaveList.vue'
import NewSaveOverlay from '../../../src/renderer/components/Saves/NewSaveOverlay.vue'
import * as saves from '../../../src/renderer/storage/saves'

jest.mock('../../../src/renderer/storage/saves', () => ({
  getSaves: jest.fn(),
  createSave: jest.fn()
}))

function factory () {
  return shallowMount(Saves, {
    mocks: {
      $route: {
        params: {gameId: 'testGameId'}
      }
    }
  })
}

describe('Saves.vue', () => {
  test('Renders the SaveList component', () => {
    const wrapper = factory()
    expect(wrapper.contains(SaveList)).toBe(true)
  })

  test('Fetches list of saves with the gameID as an arg', () => {
    factory()
    expect(saves.getSaves).toBeCalledWith('testGameId')
  })

  describe('New Save Overlay', () => {
    test('Not displayed by default', () => {
      const wrapper = factory()
      expect(wrapper.contains(NewSaveOverlay)).toBe(false)
    })

    test("Has a button with the text 'Open New Save Overlay'", () => {
      const wrapper = factory()
      const button = wrapper.find('button')

      expect(button.text()).toBe('Open New Save Overlay')
    })

    test("Clicking the 'Open New Save Overlay' button displays the NewSaveOverlay component", () => {
      const wrapper = factory()
      expect(wrapper.contains(NewSaveOverlay)).toBe(false)

      const button = wrapper.find('button')
      button.trigger('click')

      expect(wrapper.contains(NewSaveOverlay)).toBe(true)
    })

    test("Calls createNewSave() method when 'createNewSave' is emitted", () => {
      const wrapper = factory()
      // Make sure the new save overlay is rendered
      wrapper.setData({showNewSaveOverlay: true})
      expect(wrapper.contains(NewSaveOverlay)).toBe(true)

      wrapper.setMethods({createNewSave: jest.fn()})
      wrapper.find(NewSaveOverlay).vm.$emit('createNewSave')

      expect(wrapper.vm.createNewSave).toBeCalled()
    })
  })

  describe('createNewSave()', () => {
    test('Calls saves.createSave() with the game ID and save name as args', () => {
      const wrapper = factory()
      wrapper.vm.createNewSave('testSaveName')

      expect(saves.createSave).toBeCalledWith('testGameId', 'testSaveName')
    })

    test('Fetches a new list of saves after the save has been created', () => {
      const wrapper = factory()
      wrapper.vm.createNewSave('testSaveName')

      expect(saves.getSaves).toBeCalled()
    })

    test('Hides the NewSaveOverlay', () => {
      const wrapper = factory()
      // Make sure the new save overlay is rendered
      wrapper.setData({showNewSaveOverlay: true})
      expect(wrapper.contains(NewSaveOverlay)).toBe(true)

      wrapper.vm.createNewSave('testSaveName')
      expect(wrapper.contains(NewSaveOverlay)).toBe(false)
    })
  })
})
