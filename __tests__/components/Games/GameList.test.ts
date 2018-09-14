import {shallowMount} from '@vue/test-utils'
import GameList from '../../../src/renderer/components/Games/GameList.vue'

const games = {
  test1: {name: 'test1'},
  test2: {name: 'test2'},
  test3: {name: 'test3'}
}

function factory () {
  return shallowMount(GameList, {
    stubs: ['router-link'],
    mocks: {
      $store: {state: {gameData: {games}}}
    }
  })
}

describe('GameList.vue', () => {
  test('Displays the name of each game', () => {
    const wrapper = factory()
    const routerLinks = wrapper.findAll('router-link-stub')

    expect(routerLinks.length).toBe(3)
    routerLinks.wrappers.forEach((routerLink, index) => {
      expect(routerLink.text()).toBe(Object.values(games)[index].name)
    })
  })

  test('router-link links to the save page with the id of the clicked game', () => {
    const wrapper = factory()
    const routerLinks = wrapper.findAll('router-link-stub')

    expect(routerLinks.length).toBe(3)
    routerLinks.wrappers.forEach((routerLink, index) => {
      expect(routerLink.attributes().to).toBe(`/saves/${Object.keys(games)[index]}`)
    })
  })
})
