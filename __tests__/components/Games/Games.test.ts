import {shallowMount} from '@vue/test-utils'
import * as data from '../../../src/renderer/storage/data'
import Games from '../../../src/renderer/components/Games/Games.vue'
import GameList from '../../../src/renderer/components/Games/GameList.vue'

jest.mock('../../../src/renderer/storage/data', () => ({
  getGames: jest.fn()
}))

describe('Games.vue', () => {
  test('Fetches game names', () => {
    shallowMount(Games)
    expect(data.getGames).toBeCalled()
  })

  test('Renders the GameList component', () => {
    const wrapper = shallowMount(Games)
    expect(wrapper.contains(GameList)).toBe(true)
  })
})
