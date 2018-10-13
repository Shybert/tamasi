<template>
  <div class="setting" :class="{changed: isNotDefault}">
    <h3 class="settingLabel">{{settingInfo.label}}</h3>
    <p class="settingDesc">{{settingInfo.description}}</p>

    <component :is="getComponentName(settingInfo.type)" :categoryId="categoryId" :settingId="settingId"></component>    
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'
import {ISetting} from '../../store/settingsData'

import HotkeyComponent from './inputs/Hotkey.vue'

@Component({components: {HotkeyComponent}})
export default class Setting extends Vue {
  @Prop(String) categoryId!: string
  @Prop(String) settingId!: string
  get settingInfo (): ISetting {
    return this.$store.state.settings.defaultSettings[this.categoryId].settings[this.settingId]
  }
  get isNotDefault (): boolean {
    return !this.$store.getters.isSettingDefault(this.categoryId, this.settingId)
  }

  getComponentName (type: string): string {
    const capitalizedType: string = `${type[0].toUpperCase()}${type.slice(1)}`
    return `${capitalizedType}Component`
  }
}
</script>

<style scoped>
.changed {
  background-color: dimgray;
}
</style>
