interface IBaseSettingInfo {
  label: string
  description: string
  type: string
  defaultValue: any
}
interface INumberSettingInfo extends IBaseSettingInfo {
  type: 'number'
  defaultValue: number
  min: number
  max?: number
}
interface IKeybindSettingInfo extends IBaseSettingInfo {
  type: 'keybind'
  defaultValue: string
}
interface IEnumSettingInfo extends IBaseSettingInfo {
  type: 'enum'
  defaultValue: string | number
  acceptedValues: (string | number)[]
}
interface ICheckboxSettingInfo extends IBaseSettingInfo {
  type: 'checkbox'
  defaultValue: boolean
}
export type TSettingInfo = INumberSettingInfo | IKeybindSettingInfo | IEnumSettingInfo | ICheckboxSettingInfo

export interface ISettings {
  [settingId: string]: TSettingInfo
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
      defaultGame: {
        label: 'Default game',
        description: 'Which game to display by default when starting the application',
        type: 'enum',
        defaultValue: 'ds3',
        acceptedValues: ['des', 'ds1', 'ds2', 'ds3', 'bb']
      },
      test: {
        label: 'Test setting',
        description: 'testytestytest',
        type: 'number',
        defaultValue: 5,
        min: 3,
        max: 6
      },
      exampleEnum: {
        label: 'Example enum setting',
        description: 'this is a only an example!',
        type: 'enum',
        defaultValue: 'A',
        acceptedValues: ['A', 'B', 'C']
      },
      exampleCheckbox: {
        label: 'Example checkbox setting',
        description: 'example 2: electric boogaloo',
        type: 'checkbox',
        defaultValue: true
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
        defaultValue: 'End'
      },
      switchTimer: {
        label: 'Switch the timer on/off',
        description: 'Keybind for switching the timer on/off',
        type: 'keybind',
        defaultValue: 'Home'
      },
      previousBoss: {
        label: 'Previous boss',
        description: 'Keybind for selecting the previous boss',
        type: 'keybind',
        defaultValue: 'PageUp'
      },
      nextBoss: {
        label: 'Next boss',
        description: 'Keybind for selecting the next boss',
        type: 'keybind',
        defaultValue: 'PageDown'
      },
      hideShowOverlay: {
        label: 'Hide/show overlay',
        description: 'Keybind for hiding/showing the overlay',
        type: 'keybind',
        defaultValue: 'Control+H'
      },
      minimizeMaximizeOverlay: {
        label: 'Minimize/maximize overlay',
        description: 'Keybind for minimizing/maximizing the overlay',
        type: 'keybind',
        defaultValue: 'Control+M'
      }
    }
  },
  overlay: {
    label: 'Overlay',
    description: 'Settings specific to the overlay',
    settings: {
      showBossTimeMilliseconds: {
        label: 'Show boss time milliseconds',
        description: 'Whether or not to show milliseconds when displaying the time for each boss',
        type: 'checkbox',
        defaultValue: true
      }
    }
  }
}
export default settingsData
