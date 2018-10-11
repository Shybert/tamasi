<template>
  <div class="categorySettings">
    <div v-for="(settingInfo, settingId) in categorySettings" :key="settingId" class="setting">
      <h3 class="settingLabel">{{settingInfo.label}}</h3>
      <p class="settingDesc">{{settingInfo.description}}</p>

      <component :is="getComponentName(settingInfo.type)" :categoryId="categoryId" :settingId="settingId"></component>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'
import {ISettings} from '../../store/settingsData'

import KeyComponent from './inputs/Key.vue'

@Component({components: {KeyComponent}})
export default class Setting extends Vue {
  @Prop(String) categoryId!: string
  get categorySettings (): ISettings {
    return this.$store.state.settings.defaultSettings[this.categoryId].settings
  }

  getComponentName (type: string): string {
    const capitalizedType: string = `${type[0].toUpperCase()}${type.slice(1)}`
    return `${capitalizedType}Component`
  }
}
</script>
