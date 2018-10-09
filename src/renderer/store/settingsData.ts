const acceleratorKeys: string[] = ['Home', 'End', 'PageUp', 'PageDown', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i' ,'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'y', 'x', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'Y', 'X', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

interface ISetting {
  label: string,
  description: string,
  type: 'key',
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
        type: 'key',
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
        type: 'key',
        default: 'End',
        acceptedValues: acceleratorKeys
      },
      switchTimer: {
        label: 'Switch the timer on/off',
        description: 'Hotkey for switching the timer on/off',
        type: 'key',
        default: 'Home',
        acceptedValues: acceleratorKeys
      },
      previousBoss: {
        label: 'Previous boss',
        description: 'Hotkey for selecting the previous boss',
        type: 'key',
        default: 'PageUp',
        acceptedValues: acceleratorKeys
      },
      nextBoss: {
        label: 'Next boss',
        description: 'Hotkey for selecting the next boss',
        type: 'key',
        default: 'PageDown',
        acceptedValues: acceleratorKeys
      }
    }
  }
}
export default settingsData
