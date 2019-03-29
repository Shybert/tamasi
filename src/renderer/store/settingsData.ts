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
  readonly id: string
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
interface ISettingInteger extends IBaseSetting {
  readonly type: 'integer'
  readonly defaultValue: number
  readonly min?: number
  readonly max?: number
}
type TSettingTypes = ISettingKeybind | ISettingInteger

export interface ISettings {
  readonly test: ISettingInteger
  readonly keybindDeathsIncrement: ISettingKeybind
  readonly keybindDeathsDecrement: ISettingKeybind
}
export const settings: ISettings = {
  test: {
    id: 'test',
    category: 'general',
    label:  'Test setting',
    description:  'testytestytest',
    type:  'integer',
    defaultValue:  5,
    min:  3,
    max:  6
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
