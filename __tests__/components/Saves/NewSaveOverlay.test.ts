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

  test('Displays a button for closing the overlay', () => {
    const wrapper = shallowMount(NewSaveOverlay)
    expect(wrapper.find('#closeOverlay').exists()).toBe(true)
  })

  test('Clicking the close overlay button emits a message to close the overlay', () => {
    const wrapper = shallowMount(NewSaveOverlay)

    const closeOverlay = wrapper.find('#closeOverlay')
    closeOverlay.trigger('click')

    expect(wrapper.emitted('closeOverlay')).toBeTruthy()
  })
})
