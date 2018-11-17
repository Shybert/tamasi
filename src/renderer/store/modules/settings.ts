import Vue from 'vue'
import {DefineMutations, DefineGetters} from 'vuex-type-helper'
import throttle from 'lodash/throttle'
import settingsData, {ISettingsCategories} from '../settingsData'
import * as acceleratorHelpers from '../../utils/acceleratorHelpers'
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

  recordKeybindInput: string
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

  recordKeybindInput (state, identifier) {
    state.recordingKeybindInput = identifier
  },
  stopRecordingKeybindInput (state) {
    state.recordingKeybindInput = null
  }
}

interface ISettingsGetters {
  settingValue: (categoryId: string, settingId: string) => any
  literalSettingValue: (categoryId: string, settingId: string) => any // Returns the user setting even if it isn't valid

  validateSettingValue: (categoryId: string, settingId: string, settingValue: unknown) => string | null
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
  literalSettingValue: (state) => (categoryId, settingId) => {
    if (categoryId in state.userSettings && settingId in state.userSettings[categoryId]) {
      return state.userSettings[categoryId][settingId]
    }

    // No user setting, get default value
    return state.defaultSettings[categoryId].settings[settingId].defaultValue
  },

  validateSettingValue: (state) => (categoryId, settingId, settingValue) => {
    const settingInfo = state.defaultSettings[categoryId].settings[settingId]

    switch (settingInfo.type) {
      case 'number':
        if (!(typeof settingValue === 'number')) return 'Value must be a number.'
        if (!Number.isInteger(settingValue)) return 'Value must be an integer.'
        if (settingValue < settingInfo.min) return `Value cannot be lower than ${settingInfo.min}`
        if (settingInfo.max && (settingValue > settingInfo.max)) return `Value cannot be higher than ${settingInfo.max}`
        break

      case 'keybind':
        if (!(typeof settingValue === 'string')) return 'Value must be a string.'
        const errorMessage = acceleratorHelpers.validateKeybind(settingValue)
        if (errorMessage) return errorMessage
        break

      case 'enum':
        if (!(typeof settingValue === 'string') && !(typeof settingValue === 'number')) return 'Value must be a string or a number.'
        if (!settingInfo.acceptedValues.includes(settingValue)) return 'Value is not an accepted value.'
        break

      case 'checkbox':
        if (!(typeof settingValue === 'boolean')) return 'Value must be a boolean'
        break
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
