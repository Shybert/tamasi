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

const actions = {
  setHotkey ({commit}: {commit: any}, payload: {categoryId: string, settingId: string, setting: string}) {
    commit('setSetting', payload)
    commit('deselectKeyInput') // Reset selected key input when a hotkey has been set
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
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
