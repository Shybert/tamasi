import {shallowMount} from '@vue/test-utils'
import {ipcRenderer} from 'electron'
import SaveList from '../../../src/renderer/components/Saves/SaveList.vue'

jest.mock('electron')

const saveList = {
  test1: {name: 'test1'},
  test2: {name: 'test2'},
  test3: {name: 'test3'}
}

function factory () {
  return shallowMount(SaveList, {
    propsData: {
      saveList
    },
    mocks: {
      $route: {
        params: {gameId: 'testGameId'}
      }
    }
  })
}

describe('SaveList.vue', () => {
  test('Displays the name of each save', () => {
    const wrapper = factory()
    const lis = wrapper.findAll('li')

    expect(lis.length).toBe(3)
    lis.wrappers.forEach((li, index) => {
      expect(li.text()).toBe(Object.values(saveList)[index].name)
    })
  })

  test('Sends a message with IPC when you click a save name to open the overlay, with the game ID and save ID as args', () => {
    const wrapper = factory()
    const li = wrapper.find('li')
    li.trigger('click')

    expect(ipcRenderer.send).toBeCalledWith('loadOverlayWindow', 'testGameId', Object.keys(saveList)[0])
  })
})
