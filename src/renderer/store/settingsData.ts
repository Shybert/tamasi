const acceleratorKeysRegex: RegExp = /^([a-zA-Z0-9,_:;*?=(){}$&%#"!@^~|'`<>\.\-\[\]\/\\]|F1?([1-9]|10|2[0-4])|Plus|Space|Tab|Backspace|Delete|Insert|Return|Enter|Up|Down|Left|Right|Home|End|PageUp|PageDown|Escape|Esc|VolumeUp|VolumeDown|VolumeMute|MediaNextTrack|MediaPreviousTrack|MediaStop|MediaPlayPause|PrintScreen)$/

export interface ISettingInfo {
  label: string
  description: string
  type: 'hotkey'
  default: string
  acceptedValues: RegExp
}
export interface ISettings {
  [x: string]: ISettingInfo
}
interface ISettingsCategory {
  label: string
  description: string
  settings: ISettings
}
export interface ISettingsCategories {
  [x: string]: ISettingsCategory
}

const settingsData: ISettingsCategories = {
  general: {
    label: 'General',
    description: 'General...',
    settings: {
      test: {
        label: 'Test setting',
        description: 'testytestytest',
        type: 'hotkey',
        default: 'P',
        acceptedValues: acceleratorKeysRegex
      }
    }
  },
  hotkeys: {
    label: 'Hotkeys',
    description: 'Hotkeys...',
    settings: {
      incrementDeaths: {
        label: 'Increment death counter',
        description: 'Hotkey for incrementing the death counter',
        type: 'hotkey',
        default: 'End',
        acceptedValues: acceleratorKeysRegex
      },
      switchTimer: {
        label: 'Switch the timer on/off',
        description: 'Hotkey for switching the timer on/off',
        type: 'hotkey',
        default: 'Home',
        acceptedValues: acceleratorKeysRegex
      },
      previousBoss: {
        label: 'Previous boss',
        description: 'Hotkey for selecting the previous boss',
        type: 'hotkey',
        default: 'PageUp',
        acceptedValues: acceleratorKeysRegex
      },
      nextBoss: {
        label: 'Next boss',
        description: 'Hotkey for selecting the next boss',
        type: 'hotkey',
        default: 'PageDown',
        acceptedValues: acceleratorKeysRegex
      }
    }
  }
}
export default settingsData
