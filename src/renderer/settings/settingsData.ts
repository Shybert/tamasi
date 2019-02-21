import * as settingsService from './settingsService'

export interface ISettings {
  general: {
    test: settingsService.SettingInteger
  },
  keybinds: {
    incrementDeaths: settingsService.SettingKeybind
    // decrementDeaths: settingsService.SettingKeybind
    // switchTimer: settingsService.SettingKeybind
    // previousBoss: settingsService.SettingKeybind
    // nextBoss: settingsService.SettingKeybind
    // hideShowOverlay: settingsService.SettingKeybind
    // hideShowBossListOnOverlay: settingsService.SettingKeybind
  }
}

const settings: ISettings = {
  general: {
    test: new settingsService.SettingInteger('general.test', 'Test setting', 'testytestytest', 5, {min: 3, max: 6})
  },
  keybinds: {
    incrementDeaths: new settingsService.SettingKeybind('keybinds.incrementDeaths', 'Increment death counter', 'Keybind for incrementing the death counter.', [65, 66])
  }
}
export default settings
