import Store from 'electron-store'
const userSettings = new Store({name: 'userSettings', cwd: 'storage'})

class Setting<T> {
  private id: string
  public label: string
  public description: string
  public settingValue: T
  private defaultValue: T

  private getUserSetting (): unknown {
    const userSetting: unknown = userSettings.get(this.id)
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

  public isSettingValueDefault (): boolean {
    return this.settingValue === this.defaultValue
  }

  public setSettingValue (value: any): void {
    if (this.isValidSettingValue(value)) {
      this.settingValue = value
      userSettings.set(this.id, value)
    }
  }
}

export class SettingKeybind extends Setting<number[]> {}
