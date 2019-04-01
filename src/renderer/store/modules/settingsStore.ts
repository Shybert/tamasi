import {Getters, Module} from 'vuex-smart-module'
import {settings, ISettings} from '../settingsData'

interface IUserSettings {
  [settingId: string]: any
}
class SettingsState {
  userSettings: IUserSettings = {}
}

class SettingsGetters extends Getters<SettingsState> {
  isSettingValueDefault (settingId: keyof ISettings): boolean {
    if (!this.state.userSettings[settingId]) return true
    if (this.state.userSettings[settingId] === settings[settingId].defaultValue) return true
    return false
  }
}

export const settingsStore = new Module({
  state: SettingsState,
  getters: SettingsGetters
})
