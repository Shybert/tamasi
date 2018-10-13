import Vue from 'vue'
import settingsData, {ISettingsCategories} from '../settingsData'
import Store from 'electron-store'
const userSettingsData = new Store({name: 'userSettings', cwd: 'storage'})

interface IUserSettings {
  [x: string]: { // Category ID
    [x: string]: any // Setting ID
  }
}

interface ISettingsState {
  userSettings: IUserSettings,
  defaultSettings: ISettingsCategories,
  hotkeyInputSelected: null | string
}
const state: ISettingsState = {
  userSettings: userSettingsData.store,
  defaultSettings: settingsData,
  hotkeyInputSelected: null
}

const mutations = {
  setSettingValue (state: ISettingsState, payload: {categoryId: string, settingId: string, settingValue: string}) {
    // Since Vue cannot detect property addition
    if (!(payload.categoryId in state.userSettings)) Vue.set(state.userSettings, payload.categoryId, {})
    if (!(payload.settingId in state.userSettings[payload.categoryId])) Vue.set(state.userSettings[payload.categoryId], payload.settingId, {})

    state.userSettings[payload.categoryId][payload.settingId] = payload.settingValue
    userSettingsData.set(`${payload.categoryId}.${payload.settingId}`, payload.settingValue)
  },

  selectHotkeyInput (state: ISettingsState, payload: {categoryId: string, settingId: string}) {
    state.hotkeyInputSelected = `${payload.categoryId}.${payload.settingId}`
  },
  deselectHotkeyInput (state: ISettingsState) {
    state.hotkeyInputSelected = null
  }
}

const getters = {
  settingValue: (state: ISettingsState) => (categoryId: string, settingId: string) => {
    if (categoryId in state.userSettings) {
      const userSetting: string = state.userSettings[categoryId][settingId]
      if (userSetting) return userSetting
    }

    // No user setting, get default value
    return state.defaultSettings[categoryId].settings[settingId].default
  },

  hotkeys: (state: ISettingsState, getters: any) => {
    return Object.keys(state.defaultSettings.hotkeys.settings).map(settingId => {
      return getters.settingValue('hotkeys', settingId)
    })
  },

  isSettingValueAccepted: (state: ISettingsState) => (categoryId: string, settingId: string, settingValue: any): boolean => {
    if (state.defaultSettings[categoryId].settings[settingId].acceptedValues.includes(settingValue)) return true
    return false
  },
  isSettingValueDefault: (state: ISettingsState) => (categoryId: string, settingId: string): boolean => {
    const defaultValue = state.defaultSettings[categoryId].settings[settingId].default

    if (categoryId in state.userSettings) {
      if (settingId in state.userSettings[categoryId]) {
        if (state.userSettings[categoryId][settingId] === defaultValue) return true
        return false
      }
    }
    return true
  }
}

export default {
  state,
  mutations,
  getters
}
