// import settings from './settings'
// import Store from 'electron-store'
// const UserSettings = new Store({name: 'userSettings', cwd: 'storage'})

// interface IUserSettings {
//   [x: string]: {
//     [x: string]: any
//   }
// }

// export function getSetting (category: string, setting: string) {
//   const userSetting: string = UserSettings.get(`${category}.${setting}`)
//   if (userSetting) return userSetting

//   // No custom setting, get default value
//   return settings[category].settings[setting].default
// }

// export function setSetting (category: string, setting: string, value: string) {
//   if (!validateSetting(category, setting, value)) throw new Error(`Value '${value}' not an accepted value for this setting.`)

//   UserSettings.set(`${category}.${setting}`, value)
// }

// function validateSetting (category: string, setting: string, value: string): Boolean {
//   const acceptedValues = settings[category].settings[setting].acceptedValues

//   if (!acceptedValues.includes(value)) return false

//   return true
// }

// export function validateSettings () {
//   const userSettings: IUserSettings = UserSettings.store

//   Object.entries(userSettings).forEach(([category, categorySettings]) => {
//     Object.entries(categorySettings).forEach(([setting, value]) => {
//       if (!validateSetting(category, setting, value)) {
//         const defaultValue = settings[category].settings[setting].default

//         // Reset setting to its default value
//         UserSettings.delete(`${category}.${setting}`)

//         alert(`Setting '${setting}' in category '${category}' has an unaccepted value: '${value}'
//         The setting has been reset to its default value: '${defaultValue}'`)
//       }
//     })
//   })
// }

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
  defaultSettings: ISettingsCategories
}
const state: ISettingsState = {
  userSettings: userSettingsData.store,
  defaultSettings: settingsData
}

const getters = {
  getSetting: (state: ISettingsState) => (category: string, setting: string) => {
    const userSetting: string = state.userSettings[category][setting]
    if (userSetting) return userSetting

    // No user setting, get default value
    return state.defaultSettings[category].settings[setting].default
  }
}

export default {
  state,
  getters
}
