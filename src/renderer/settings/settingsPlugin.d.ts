import Vue from 'vue'
import {ISettings} from './settingsData'

declare module 'vue/types/vue' {
  interface Vue {
    $settings: ISettings
  }
}
