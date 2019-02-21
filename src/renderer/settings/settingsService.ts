import {VueConstructor} from 'vue'
import InputIntegerComponent from '../components/Settings/InputInteger.vue'
import Store from 'electron-store'
const userSettings = new Store({name: 'userSettings', cwd: 'storage'})

abstract class BaseSetting<T> {
  abstract inputComponent: VueConstructor
  private id: string
  public label: string
  public description: string
  private defaultValue: T

  private userSetting: any
  get userSettingValue (): any {
    return this.userSetting
  }
  set userSettingValue (value: any) {
    this.userSetting = value
    userSettings.set(this.id, value)
  }

  constructor (id: string, label: string, description: string, defaultValue: T) {
    this.id = id
    this.label = label
    this.description = description
    this.defaultValue = defaultValue
    this.userSetting = userSettings.get(this.id)
  }

  get settingValue (): T {
    return this.isValidSettingValue(this.userSettingValue) ? this.userSettingValue as T : this.defaultValue
  }

  public isUserSettingValueDefault (): boolean {
    return this.userSettingValue === this.defaultValue
  }

  abstract isValidSettingValue (value: any): boolean
}

export class SettingInteger extends BaseSetting<number> {
  inputComponent = InputIntegerComponent
  private min: number | undefined
  private max: number | undefined

  constructor (id: string, label: string, description: string, defaultValue: number, limits?: {min?: number, max?: number}) {
    super(id, label, description, defaultValue)
    if (limits) {
      if (limits.min) this.min = limits.min
      if (limits.max) this.max = limits.max
    }
  }

  isValidSettingValue (value: any): boolean {
    if (!Number.isInteger(value)) return false
    if (this.min && value < this.min) return false
    if (this.max && value > this.max) return false
    return true
  }
}

export class SettingKeybind extends BaseSetting<number[]> {
  inputComponent = InputIntegerComponent
  isValidSettingValue (value: any): boolean {
    return true
  }
}
