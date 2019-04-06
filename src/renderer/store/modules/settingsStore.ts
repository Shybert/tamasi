import Vue from 'vue'
import {Getters, Mutations, Module} from 'vuex-smart-module'
import {settings, ISettings, isValidSettingValue} from '../settingsData'

interface IUserSettings {
  [settingId: string]: any
}
class SettingsState {
  userSettings: IUserSettings = {}
}

class SettingsMutations extends Mutations<SettingsState> {
  setSettingValue<TSettingId extends keyof ISettings> (payload: {settingId: TSettingId, value: ISettings[TSettingId]['defaultValue']}): void {
    Vue.set(this.state.userSettings, payload.settingId, payload.value)
  }
}

class SettingsGetters extends Getters<SettingsState> {
  getSettingValue<TSettingId extends keyof ISettings> (settingId: TSettingId): ISettings[TSettingId]['defaultValue'] {
    const userSettingValue = this.state.userSettings[settingId]
    if (userSettingValue && isValidSettingValue(settings[settingId], userSettingValue)) return userSettingValue
    return settings[settingId].defaultValue
  }
  isSettingValueDefault (settingId: keyof ISettings): boolean {
    if (!this.state.userSettings[settingId]) return true
    if (this.state.userSettings[settingId] === settings[settingId].defaultValue) return true
    return false
  }
}

export const settingsStore = new Module({
  state: SettingsState,
  mutations: SettingsMutations,
  getters: SettingsGetters
})
