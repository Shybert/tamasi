import * as accelerators from '../utils/accelerators'

const acceptedKeybinds = {
  description: 'Accepted keybinds include...',
  test: accelerators.isValidKeybind
}

export interface ISettingInfo {
  label: string
  description: string
  type: 'keybind'
  default: string
  acceptedValues: {
    description: string
    test: (value: string) => boolean
  }
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
        type: 'keybind',
        default: 'P',
        acceptedValues: acceptedKeybinds
      }
    }
  },
  keybinds: {
    label: 'Keybinds',
    description: 'Keybinds...',
    settings: {
      incrementDeaths: {
        label: 'Increment death counter',
        description: 'Keybind for incrementing the death counter',
        type: 'keybind',
        default: 'End',
        acceptedValues: acceptedKeybinds
      },
      switchTimer: {
        label: 'Switch the timer on/off',
        description: 'Keybind for switching the timer on/off',
        type: 'keybind',
        default: 'Home',
        acceptedValues: acceptedKeybinds
      },
      previousBoss: {
        label: 'Previous boss',
        description: 'Keybind for selecting the previous boss',
        type: 'keybind',
        default: 'PageUp',
        acceptedValues: acceptedKeybinds
      },
      nextBoss: {
        label: 'Next boss',
        description: 'Keybind for selecting the next boss',
        type: 'keybind',
        default: 'PageDown',
        acceptedValues: acceptedKeybinds
      }
    }
  }
}
export default settingsData
