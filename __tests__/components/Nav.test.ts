import {shallowMount} from '@vue/test-utils'
import Nav from '../../src/renderer/components/Nav.vue'

function factory () {
  return shallowMount(Nav, {
    stubs: ['router-link']
  })
}

describe('Nav.vue', () => {
  test('Links to the homepage', () => {
    const wrapper = factory()
    const homePage = wrapper.find('#homeLink')
    expect(homePage.exists()).toBe(true)
    expect(homePage.attributes().to).toBe('/')
  })
})
