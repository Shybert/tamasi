interface ISetting<T> {
  label: string
  description: string
  settingValue: T
  defaultValue: T

  setSettingValue (value: T): void
}

export class SettingKeybind implements ISetting<number[]> {
  public label: string
  public description: string
  public settingValue: number[]
  public defaultValue: number[]

  constructor (label: string, description: string, defaultValue: number[]) {
    this.label = label
    this.description = description
    this.defaultValue = defaultValue
    this.settingValue = defaultValue
  }

  private isValid (value: number[]): boolean {
    return true
  }
  public setSettingValue (value: number[]): void {
    if (this.isValid(value)) this.settingValue = value
  }
}
