<template>
  <div class="setting">
    <h3 class="settingLabel">{{settingInfo.label}}</h3>
    <p class="settingDesc">{{settingInfo.description}}</p>

    <component :is="getComponentName(settingInfo.type)" :categoryId="categoryId" :settingId="settingId"></component>    
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'
import {ISetting} from '../../store/settingsData'

import KeyComponent from './inputs/Key.vue'

@Component({components: {KeyComponent}})
export default class Setting extends Vue {
  @Prop(String) categoryId!: string
  @Prop(String) settingId!: string
  get settingInfo (): ISetting {
    return this.$store.state.settings.defaultSettings[this.categoryId].settings[this.settingId]
  }

  getComponentName (type: string): string {
    const capitalizedType: string = `${type[0].toUpperCase()}${type.slice(1)}`
    return `${capitalizedType}Component`
  }
}
</script>
