import {shallowMount} from '@vue/test-utils'
import BossInfo from '../../../src/renderer/components/Overlay/BossInfo.vue'

function factory (values: {name?: string, time?: number, deaths?: number}) {
  return shallowMount(BossInfo, {
    propsData: {
      bossInfo: {...values}
    }
  })
}

describe('BossInfo.vue', () => {
  test('Displays the provided boss name', () => {
    const wrapper = factory({name: 'testName'})
    expect(wrapper.find('#bossName').text()).toBe('Name: testName')
  })

  test('Displays the provided amount of deaths', () => {
    const wrapper = factory({deaths: 20})
    expect(wrapper.find('#bossDeaths').text()).toBe('Deaths: 20')
  })

  test('Displays correctly formatted time', () => {
    const wrapper = factory({time: 0})
    expect(wrapper.find('#bossTime').text()).toBe('Time: 00:00:00.000')

    wrapper.setProps({bossInfo: {time: 3661000}})
    expect(wrapper.find('#bossTime').text()).toBe('Time: 01:01:01.000')
    wrapper.setProps({bossInfo: {time: 1}})
    expect(wrapper.find('#bossTime').text()).toBe('Time: 00:00:00.001')
    wrapper.setProps({bossInfo: {time: 10}})
    expect(wrapper.find('#bossTime').text()).toBe('Time: 00:00:00.010')
    wrapper.setProps({bossInfo: {time: 10}})
    expect(wrapper.find('#bossTime').text()).toBe('Time: 00:00:00.010')
    wrapper.setProps({bossInfo: {time: 8640000000000000}})
    expect(wrapper.find('#bossTime').text()).toBe('Time: 2400000000:00:00.000')
    wrapper.setProps({bossInfo: {time: 3596459987}})
    expect(wrapper.find('#bossTime').text()).toBe('Time: 999:00:59.987')
  })
})
