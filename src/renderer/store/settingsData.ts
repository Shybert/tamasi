import {validateKeybind} from '../utils/acceleratorHelpers'

interface ISettingCategory {
  readonly label: string
  readonly description: string
  readonly settings: TSettingTypes[]
}
interface ISettingCategories {
  readonly general: ISettingCategory
  readonly keybinds: ISettingCategory
}

interface IBaseSetting {
  readonly id: keyof ISettings
  readonly category: keyof ISettingCategories
  readonly label: string
  readonly description: string
  readonly type: string
  readonly defaultValue: any
}
interface ISettingKeybind extends IBaseSetting {
  readonly type: 'keybind'
  readonly defaultValue: string
}
export interface ISettingInteger extends IBaseSetting {
  readonly type: 'integer'
  readonly defaultValue: number
  readonly min?: number
  readonly max?: number
}
export type TSettingTypes = ISettingKeybind | ISettingInteger

export interface ISettings {
  readonly test: ISettingInteger
  readonly keybindDeathsIncrement: ISettingKeybind
  readonly keybindDeathsDecrement: ISettingKeybind
}
export const settings: ISettings = {
  test: {
    id: 'test',
    category: 'general',
    label: 'Test setting',
    description: 'testytestytest',
    type: 'integer',
    defaultValue: 5,
    min: 3,
    max: 6
  },
  keybindDeathsIncrement: {
    id: 'keybindDeathsIncrement',
    category: 'keybinds',
    label: 'Increment death counter',
    description: 'Keybind for incrementing the death counter',
    type: 'keybind',
    defaultValue: 'End'
  },
  keybindDeathsDecrement: {
    id: 'keybindDeathsDecrement',
    category: 'keybinds',
    label: 'Decrement death counter',
    description: 'Keybind for decrementing the death counter',
    type: 'keybind',
    defaultValue: 'Delete'
  }
}

export const settingCategories: ISettingCategories = {
  general: {
    label: 'General',
    description: 'General...',
    settings: [settings.test]
  },
  keybinds: {
    label: 'Keybinds',
    description: 'Keybinds...',
    settings: [settings.keybindDeathsIncrement, settings.keybindDeathsDecrement]
  }
}

export function validateSettingValue (settingInfo: TSettingTypes, settingValue: any): {valid: true} | {valid: false, errorMessage: string} {
  switch (settingInfo.type) {
    case 'integer':
      if (!Number.isInteger(settingValue)) return {valid: false, errorMessage: 'Value must be an integer'}
      if (settingInfo.min && settingValue < settingInfo.min) return {valid: false, errorMessage: `Value cannot be lower than ${settingInfo.min}`}
      if (settingInfo.max && settingValue > settingInfo.max) return {valid: false, errorMessage: `Value cannot be higher than ${settingInfo.max}`}
      return {valid: true}
    case 'keybind':
      const keybindErrorMessage = validateKeybind(settingValue)
      return keybindErrorMessage ? {valid: false, errorMessage: keybindErrorMessage} : {valid: true}
    default:
      return {valid: true}
  }
}
export function isValidSettingValue (settingInfo: TSettingTypes, settingValue: any): boolean {
  const validation = validateSettingValue(settingInfo, settingValue)
  return validation.valid
}
