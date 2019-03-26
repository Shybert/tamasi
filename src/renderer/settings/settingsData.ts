import * as settingsService from './settingsService'

export interface ISettings {
  general: {
    test: settingsService.SettingInteger
  },
  keybinds: {
    incrementDeaths: settingsService.SettingKeybind
    decrementDeaths: settingsService.SettingKeybind
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
    incrementDeaths: new settingsService.SettingKeybind('keybinds.incrementDeaths', 'Increment death counter', 'Keybind for incrementing the death counter.', 'End'),
    decrementDeaths: new settingsService.SettingKeybind('keybinds.decrementDeaths', 'Decrement death counter', 'Keybind for decrementing the death counter.', 'Delete')
  }
}
export default settings
