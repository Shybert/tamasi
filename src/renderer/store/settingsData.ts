import * as acceleratorHelpers from '../utils/acceleratorHelpers'

const acceptedKeybinds = {
  description: 'Accepted keybinds include...',
  validate: acceleratorHelpers.isValidKeybind
}
function acceptedIntegers (min: number, max?: number): INumberSettingInfo['acceptedValues'] {
  const description: string = max ? `Number between and including '${min}' and '${max}'` : `Number over and including '${min}'`
  return {
    description,
    validate: (value: any) => {
      if (!(typeof value === 'number')) return 'Value must be a number.'
      if (!Number.isInteger(value)) return 'Value must be an integer.'
      if (value < min) return `Value cannot be lower than ${min}`
      if (max && value > max) return `Value cannot be higher than ${max}`
      return null
    }
  }
}

interface IBaseSettingInfo {
  label: string
  description: string
  type: string
  defaultValue: any
}
interface IKeybindSettingInfo extends IBaseSettingInfo {
  type: 'keybind'
  acceptedValues: {
    description: string,
    validate: (value: any) => boolean
  }
}
interface INumberSettingInfo extends IBaseSettingInfo {
  type: 'number'
  acceptedValues: {
    description: string
    validate: (value: any) => string | null
  }
}
interface IEnumSettingInfo extends IBaseSettingInfo {
  type: 'enum'
  acceptedValues: string[]
}
export type TSettingInfo = IKeybindSettingInfo | INumberSettingInfo | IEnumSettingInfo

export interface ISettings {
  [x: string]: TSettingInfo
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
        type: 'number',
        defaultValue: 5,
        acceptedValues: acceptedIntegers(23)
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
        defaultValue: 'End',
        acceptedValues: acceptedKeybinds
      },
      switchTimer: {
        label: 'Switch the timer on/off',
        description: 'Keybind for switching the timer on/off',
        type: 'keybind',
        defaultValue: 'Home',
        acceptedValues: acceptedKeybinds
      },
      previousBoss: {
        label: 'Previous boss',
        description: 'Keybind for selecting the previous boss',
        type: 'keybind',
        defaultValue: 'PageUp',
        acceptedValues: acceptedKeybinds
      },
      nextBoss: {
        label: 'Next boss',
        description: 'Keybind for selecting the next boss',
        type: 'keybind',
        defaultValue: 'PageDown',
        acceptedValues: acceptedKeybinds
      }
    }
  }
}
export default settingsData
