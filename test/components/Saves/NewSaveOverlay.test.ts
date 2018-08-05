import {shallowMount} from '@vue/test-utils'
import NewSaveOverlay from '../../../src/renderer/components/Saves/NewSaveOverlay.vue'

describe('NewSaveOverlay.vue', () => {
  test('Displays an input element for the save name', () => {
    const wrapper = shallowMount(NewSaveOverlay)
    expect(wrapper.find("input[id='newSaveName']").exists()).toBe(true)
  })

  test("Displays a button with the text 'Create New Save'", () => {
    const wrapper = shallowMount(NewSaveOverlay)
    expect(wrapper.find('#createSave').text()).toBe('Create New Save')
  })

  test("Clicking the '#createSave' button emits the inputted save name", () => {
    const wrapper = shallowMount(NewSaveOverlay)

    const saveNameInput = wrapper.find('#newSaveName')
    saveNameInput.setValue('Test Name')

    const button = wrapper.find('#createSave')
    button.trigger('click')

    // Wrapped in two arrays because that's what vue-test-utils does apparently
    expect(wrapper.emitted('createNewSave')).toEqual([['Test Name']])
  })
})
