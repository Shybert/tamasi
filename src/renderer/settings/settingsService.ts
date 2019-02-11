import Store from 'electron-store'
const userSettings: IUserSettings = new Store({name: 'userSettings', cwd: 'storage'}).store

interface IUserSettings {
  [id: string]: unknown
}

class Setting<T> {
  private id: string
  public label: string
  public description: string
  public settingValue: T
  private defaultValue: T

  private getUserSetting (): unknown | null {
    const userSetting = userSettings[this.id]
    if (userSetting) return userSetting
    return null
  }

  private isValidSettingValue (value: any): boolean {
    return true
  }

  constructor (id: string, label: string, description: string, defaultValue: T) {
    this.id = id
    this.label = label
    this.description = description
    this.defaultValue = defaultValue

    const userSetting = this.getUserSetting()
    if (userSetting && this.isValidSettingValue(userSetting)) this.settingValue = userSetting as T
    else this.settingValue = defaultValue
  }

  public setSettingValue (value: any): void {
    this.settingValue = value
  }
}

export class SettingKeybind extends Setting<number[]> {}
