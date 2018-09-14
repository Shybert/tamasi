import {shallowMount} from '@vue/test-utils'
import Games from '../../../src/renderer/components/Games/Games.vue'
import GameList from '../../../src/renderer/components/Games/GameList.vue'

describe('Games.vue', () => {
  test('Renders the GameList component', () => {
    const wrapper = shallowMount(Games)
    expect(wrapper.contains(GameList)).toBe(true)
  })
})
