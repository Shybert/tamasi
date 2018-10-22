import {shallowMount} from '@vue/test-utils'
import KeybindComponent from '../../../../../src/renderer/components/Settings/inputs/Keybind.vue'

interface State {settings: {recordingKeybindInput: string | null}}
interface Getters {settingValue: () => string}
interface Mocks {$store: {
  commit: Function
  state: State
  getters: Getters
}}
interface Props {categoryId: string, settingId: string}

describe('Keybind.vue', () => {
  let state: State
  let getters: Getters
  let mocks: Mocks
  let props: Props

  beforeEach(() => {
    state = {settings: {
      recordingKeybindInput: 'category.setting'
    }}
    getters = {
      settingValue: () => 'a'
    }
    mocks = {$store: {
      commit: jest.fn(),
      state,
      getters
    }}

    props = {
      categoryId: 'category',
      settingId: 'setting'
    }
  })

  test('Displays the keybind setting value', () => {
    const wrapper = shallowMount(KeybindComponent, {mocks, propsData: props})
    const settingKeybindElement = wrapper.find('.settingKeybind')
    expect(settingKeybindElement.text()).toBe(getters.settingValue())
  })

  describe('.inputError', () => {
    test('Element not shown by default', () => {
      const wrapper = shallowMount(KeybindComponent, {mocks, propsData: props})
      const inputErrorElement = wrapper.find('.inputError')
      expect(inputErrorElement.exists()).toBe(false)
    })
    test('Element shown with error message when there is an input error', () => {
      const wrapper = shallowMount(KeybindComponent, {mocks, propsData: props})
      const inputErrorMessage: string = 'test'
      wrapper.setData({inputError: inputErrorMessage})

      const inputErrorElement = wrapper.find('.inputError')
      expect(inputErrorElement.exists()).toBe(true)
      expect(inputErrorElement.text()).toBe(inputErrorMessage)
    })
  })

  describe('Clicking button to record keybind input', () => {
    test("Calls 'recordKeybindInput' with category ID and setting ID if not already recording", () => {
      mocks.$store.state.settings.recordingKeybindInput = null
      const wrapper: any = shallowMount(KeybindComponent, {mocks, propsData: props})

      expect(wrapper.vm.isRecording).toBe(false)
      const recordButton = wrapper.find('.recordKeybind')
      recordButton.trigger('click')
      expect(mocks.$store.commit).toBeCalledWith('recordKeybindInput', {categoryId: props.categoryId, settingId: props.settingId})
    })

    describe('While recording', () => {
      test('Calls "stopRecordingKeybindInput"', () => {
        const wrapper: any = shallowMount(KeybindComponent, {mocks, propsData: props})
        expect(wrapper.vm.isRecording).toBe(true)

        const recordButton = wrapper.find('.recordKeybind')
        recordButton.trigger('click')
        expect(mocks.$store.commit).toBeCalledWith('stopRecordingKeybindInput')
      })
    })

    test('Calls "setSettingValue" with the category ID, setting ID, and setting value as params, if recording', () => {
      const wrapper: any = shallowMount(KeybindComponent, {mocks, propsData: props})
      expect(wrapper.vm.isRecording).toBe(true)

    })
  })

  describe('Keydown when recording keybind input', () => {
    test('Displays the pressed key, if valid', () => {
      const wrapper: any = shallowMount(KeybindComponent, {mocks, propsData: props})
      expect(wrapper.vm.isRecording).toBe(true)

      const settingKeybindElement = wrapper.find('.settingKeybind')
      settingKeybindElement.trigger('keydown', {key: '1'})
      expect(settingKeybindElement.text()).toBe('1')
    })

    test("Doesn't display the key and doesn't change the previous text, if not valid", () => {
      const wrapper: any = shallowMount(KeybindComponent, {mocks, propsData: props})
      expect(wrapper.vm.isRecording).toBe(true)

      const settingKeybindElement = wrapper.find('.settingKeybind')
      const previousText: string = settingKeybindElement.text()
      settingKeybindElement.trigger('keydown', {key: 'invalid'})
      expect(settingKeybindElement.text()).toBe(previousText)
    })

    test('Displays the "inputError" element, if the key is invalid', () => {
      const wrapper: any = shallowMount(KeybindComponent, {mocks, propsData: props})
      expect(wrapper.vm.isRecording).toBe(true)
      const inputErrorElement = wrapper.find('.inputError')
      expect(inputErrorElement.exists()).toBe(false)

      const settingKeybindElement = wrapper.find('.settingKeybind')
      settingKeybindElement.trigger('keydown', {key: 'invalid'})
      expect(inputErrorElement.exists()).toBe(true)
    })

    test('Hides the inputError element after a valid keypress', () => {
      const wrapper: any = shallowMount(KeybindComponent, {mocks, propsData: props})
      expect(wrapper.vm.isRecording).toBe(true)

      const inputErrorElement = wrapper.find('.inputError')
      const settingKeybindElement = wrapper.find('.settingKeybind')
      settingKeybindElement.trigger('keydown', {key: 'invalid'})
      expect(inputErrorElement.exists()).toBe(true)

      settingKeybindElement.trigger('keydown', {key: '1'})
      expect(inputErrorElement.exists()).toBe(false)
    })

    test('Display multiple keys seperated by a "+"', () => {
      const wrapper: any = shallowMount(KeybindComponent, {mocks, propsData: props})
      expect(wrapper.vm.isRecording).toBe(true)

      const settingKeybindElement = wrapper.find('.settingKeybind')
      settingKeybindElement.trigger('keydown', {key: '1'})
      settingKeybindElement.trigger('keydown', {key: 'Ctrl'})
      expect(settingKeybindElement.text()).toBe('1+Ctrl')
      settingKeybindElement.trigger('keydown', {key: 'Alt'})
      expect(settingKeybindElement.text()).toBe('1+Ctrl+Alt')
    })
  })

  describe('Keyup when recording keybind input', () => {
    test("Doesn't stop displaying the released key", () => {
      const wrapper: any = shallowMount(KeybindComponent, {mocks, propsData: props})
      expect(wrapper.vm.isRecording).toBe(true)

      const settingKeybindElement = wrapper.find('.settingKeybind')
      settingKeybindElement.trigger('keydown', {key: '1'})
      expect(settingKeybindElement.text()).toBe('1')
      settingKeybindElement.trigger('keyup', {key: '1'})
      expect(settingKeybindElement.text()).toBe('1')
    })
  })
})
