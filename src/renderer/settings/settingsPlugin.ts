import settings from './settingsData'

const SettingsPlugin = {
  install (Vue: any) {
    Vue.prototype.$settings = settings
  }
}

export default SettingsPlugin
