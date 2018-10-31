import Vue from 'vue'
import throttle from 'lodash/throttle'
import settingsData, {ISettingsCategories} from '../settingsData'
import Store from 'electron-store'
const userSettingsData = new Store({name: 'userSettings', cwd: 'storage'})

interface IUserSettings {
  [categoryId: string]: {
    [settingId: string]: any
  }
}

interface ISettingsState {
  userSettings: IUserSettings
  defaultSettings: ISettingsCategories
  recordingKeybindInput: string | null
}
const state: ISettingsState = {
  userSettings: userSettingsData.store,
  defaultSettings: settingsData,
  recordingKeybindInput: null
}
function saveSettings (): void {
  userSettingsData.store = state.userSettings
}
const throttledSaveSettings = throttle(saveSettings, 1000)

const mutations = {
  setSettingValue (state: ISettingsState, payload: {categoryId: string, settingId: string, settingValue: string}) {
    // Since Vue cannot detect property addition
    if (!(payload.categoryId in state.userSettings)) Vue.set(state.userSettings, payload.categoryId, {})
    if (!(payload.settingId in state.userSettings[payload.categoryId])) Vue.set(state.userSettings[payload.categoryId], payload.settingId, {})

    state.userSettings[payload.categoryId][payload.settingId] = payload.settingValue
    throttledSaveSettings()
  },

  recordKeybindInput (state: ISettingsState, payload: {categoryId: string, settingId: string}) {
    state.recordingKeybindInput = `${payload.categoryId}.${payload.settingId}`
  },
  stopRecordingKeybindInput (state: ISettingsState) {
    state.recordingKeybindInput = null
  }
}

const getters = {
  settingValue: (state: ISettingsState) => (categoryId: string, settingId: string) => {
    if (categoryId in state.userSettings) {
      if (settingId in state.userSettings[categoryId]) return state.userSettings[categoryId][settingId]
    }

    // No user setting, get default value
    return state.defaultSettings[categoryId].settings[settingId].defaultValue
  },

  keybinds: (state: ISettingsState, getters: any) => {
    return Object.keys(state.defaultSettings.keybinds.settings).map(settingId => {
      return getters.settingValue('keybinds', settingId)
    })
  },

  validateSettingValue: (state: ISettingsState) => (categoryId: string, settingId: string, settingValue: any): string | null => {
    const settingInfo = state.defaultSettings[categoryId].settings[settingId]

    switch (settingInfo.type) {
      case 'keybind':
        if (!settingInfo.acceptedValues.validate(settingValue)) return 'Keybind is not valid.'
        break
      case 'number':
        const errorMessage = settingInfo.acceptedValues.validate(settingValue)
        if (errorMessage) return errorMessage
        break
      default:
        return null
    }
    return null
  },
  isSettingValueDefault: (state: ISettingsState) => (categoryId: string, settingId: string): boolean => {
    const defaultValue = state.defaultSettings[categoryId].settings[settingId].defaultValue

    if (categoryId in state.userSettings && settingId in state.userSettings[categoryId]) {
      if (state.userSettings[categoryId][settingId] === defaultValue) return true
      return false
    }
    return true
  }
}

export default {
  state,
  mutations,
  getters
}
