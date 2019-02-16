import Store from 'electron-store'
const userSettings = new Store({name: 'userSettings', cwd: 'storage'})

abstract class BaseSetting<T> {
  private id: string
  public label: string
  public description: string
  private userSettingValue: unknown
  private defaultValue: T

  private getUserSetting (): unknown {
    const userSetting: unknown = userSettings.get(this.id)
    if (userSetting) return userSetting
    return null
  }

  constructor (id: string, label: string, description: string, defaultValue: T) {
    this.id = id
    this.label = label
    this.description = description
    this.defaultValue = defaultValue

    const userSetting = this.getUserSetting()
    if (userSetting) this.userSettingValue = userSetting
  }

  get settingValue (): T {
    return this.isValidSettingValue(this.userSettingValue) ? this.userSettingValue as T : this.defaultValue
  }
  set settingValue (value: T) {
    this.userSettingValue = value
    userSettings.set(this.id, value)
  }

  public isSettingValueDefault (): boolean {
    return this.settingValue === this.defaultValue
  }

  abstract isValidSettingValue (value: any): boolean
    }
  }
}

export class SettingKeybind extends BaseSetting<number[]> {
  isValidSettingValue (value: any): boolean {
    return true
  }
}
