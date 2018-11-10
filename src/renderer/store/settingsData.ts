import * as validators from '../utils/validators'
import * as acceleratorHelpers from '../utils/acceleratorHelpers'

interface ISettingInfo {
  label: string
  description: string
  inputType: 'number' | 'keybind' | 'enum'
  defaultValue: any
  validators: {
    validator: (value: any, option?: any) => string | null
    option?: any
  }[]
  acceptedValues?: string[]
}
export interface ISettings {
  [settingId: string]: ISettingInfo
}
interface ISettingsCategory {
  label: string
  description: string
  settings: ISettings
}
export interface ISettingsCategories {
  [categoryId: string]: ISettingsCategory
}

const settingsData: ISettingsCategories = {
  general: {
    label: 'General',
    description: 'General...',
    settings: {
      test: {
        label: 'Test setting',
        description: 'testytestytest',
        inputType: 'number',
        defaultValue: 5,
        validators: [{validator: validators.number},
        {validator: validators.integer},
        {validator: validators.moreThan, option: 3}
        ]
      },
      exampleEnum: {
        label: 'Example enum setting',
        description: 'this is a only an example!',
        inputType: 'enum',
        defaultValue: 'A',
        acceptedValues: ['A', 'B', 'C'],
        validators: []
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
        inputType: 'keybind',
        defaultValue: 'End',
        validators: [{validator: acceleratorHelpers.validateKeybind}]
      },
      switchTimer: {
        label: 'Switch the timer on/off',
        description: 'Keybind for switching the timer on/off',
        inputType: 'keybind',
        defaultValue: 'Home',
        validators: [{validator: acceleratorHelpers.validateKeybind}]
      },
      previousBoss: {
        label: 'Previous boss',
        description: 'Keybind for selecting the previous boss',
        inputType: 'keybind',
        defaultValue: 'PageUp',
        validators: [{validator: acceleratorHelpers.validateKeybind}]
      },
      nextBoss: {
        label: 'Next boss',
        description: 'Keybind for selecting the next boss',
        inputType: 'keybind',
        defaultValue: 'PageDown',
        validators: [{validator: acceleratorHelpers.validateKeybind}]
      }
    }
  }
}
export default settingsData
