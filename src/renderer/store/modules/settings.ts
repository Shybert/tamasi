import Vue from 'vue'
import {DefineMutations, DefineGetters} from 'vuex-type-helper'
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

interface ISettingsMutations {
  setSettingValue: {
    categoryId: string
    settingId: string
    settingValue: any
  }

  recordKeybindInput: {
    categoryId: string
    settingId: string
  }
  stopRecordingKeybindInput: void
}
const mutations: DefineMutations<ISettingsMutations, ISettingsState> = {
  setSettingValue (state, {categoryId, settingId, settingValue}) {
    // Since Vue cannot detect property addition
    if (!(categoryId in state.userSettings)) Vue.set(state.userSettings, categoryId, {})
    if (!(settingId in state.userSettings[categoryId])) Vue.set(state.userSettings[categoryId], settingId, {})

    state.userSettings[categoryId][settingId] = settingValue
    throttledSaveSettings()
  },

  recordKeybindInput (state, {categoryId, settingId}) {
    state.recordingKeybindInput = `${categoryId}.${settingId}`
  },
  stopRecordingKeybindInput (state) {
    state.recordingKeybindInput = null
  }
}

interface ISettingsGetters {
  settingValue: (categoryId: string, settingId: string) => any
  keybinds: any[]
  validateSettingValue: (categoryId: string, settingId: string, settingValue: any) => string | null
  isSettingValueDefault: (categoryId: string, settingId: string) => boolean
}
const getters: DefineGetters<ISettingsGetters, ISettingsState> = {
  settingValue: (state, getters) => (categoryId, settingId) => {
    if (categoryId in state.userSettings && settingId in state.userSettings[categoryId]) {
      const settingValue = state.userSettings[categoryId][settingId]
      const errorMessage = getters.validateSettingValue(categoryId, settingId, settingValue)
      if (!errorMessage) return settingValue
    }

    // No user setting, get default value
    return state.defaultSettings[categoryId].settings[settingId].defaultValue
  },

  keybinds: (state, getters) => {
    return Object.keys(state.defaultSettings.keybinds.settings).map(settingId => {
      return getters.settingValue('keybinds', settingId)
    })
  },

  validateSettingValue: (state) => (categoryId, settingId, settingValue) => {
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
  isSettingValueDefault: (state) => (categoryId, settingId) => {
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
