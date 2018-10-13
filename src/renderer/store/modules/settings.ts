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
  keyInputSelected: null | string
}
const state: ISettingsState = {
  userSettings: userSettingsData.store,
  defaultSettings: settingsData,
  keyInputSelected: null
}

const mutations = {
  setSetting (state: ISettingsState, payload: {categoryId: string, settingId: string, setting: string}) {
    // Since Vue cannot detect property addition
    if (!state.userSettings[payload.categoryId]) Vue.set(state.userSettings, payload.categoryId, {})
    if (!state.userSettings[payload.categoryId][payload.settingId]) Vue.set(state.userSettings[payload.categoryId], payload.settingId, {})

    state.userSettings[payload.categoryId][payload.settingId] = payload.setting
    userSettingsData.set(`${payload.categoryId}.${payload.settingId}`, payload.setting)
  },

  selectKeyInput (state: ISettingsState, payload: {categoryId: string, settingId: string}) {
    state.keyInputSelected = `${payload.categoryId}.${payload.settingId}`
  },
  deselectKeyInput (state: ISettingsState) {
    state.keyInputSelected = null
  }
}

const getters = {
  setting: (state: ISettingsState) => (category: string, setting: string) => {
    if (category in state.userSettings) {
      const userSetting: string = state.userSettings[category][setting]
      if (userSetting) return userSetting
    }

    // No user setting, get default value
    return state.defaultSettings[category].settings[setting].default
  },

  hotkeys: (state: ISettingsState, getters: any) => {
    return Object.keys(state.defaultSettings.hotkeys.settings).map(settingId => {
      return getters.setting('hotkeys', settingId)
    })
  },

  isSettingValueAccepted: (state: ISettingsState) => (categoryId: string, settingId: string, setting: any): boolean => {
    if (state.defaultSettings[categoryId].settings[settingId].acceptedValues.includes(setting)) return true
    return false
  },

  isSettingDefault: (state: ISettingsState) => (category: string, setting: string): boolean => {
    const defaultValue = state.defaultSettings[category].settings[setting].default

    if (category in state.userSettings) {
      if (setting in state.userSettings[category]) {
        if (state.userSettings[category][setting] === defaultValue) return true
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
