const acceleratorKeys: string[] = ['Home', 'End', 'PageUp', 'PageDown', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i' ,'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'y', 'x', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'Y', 'X', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

export interface ISetting {
  label: string,
  description: string,
  type: 'hotkey',
  default: string
  acceptedValues: string[]
}
export interface ISettings {
  [x: string]: ISetting
}
interface ISettingsCategory {
  label: string,
  description: string,
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
        acceptedValues: acceleratorKeys
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
        acceptedValues: acceleratorKeys
      },
      switchTimer: {
        label: 'Switch the timer on/off',
        description: 'Hotkey for switching the timer on/off',
        type: 'hotkey',
        default: 'Home',
        acceptedValues: acceleratorKeys
      },
      previousBoss: {
        label: 'Previous boss',
        description: 'Hotkey for selecting the previous boss',
        type: 'hotkey',
        default: 'PageUp',
        acceptedValues: acceleratorKeys
      },
      nextBoss: {
        label: 'Next boss',
        description: 'Hotkey for selecting the next boss',
        type: 'hotkey',
        default: 'PageDown',
        acceptedValues: acceleratorKeys
      }
    }
  }
}
export default settingsData
