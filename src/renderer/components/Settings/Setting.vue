<template>
  <div class="setting" :class="{changed: isNotDefault}">
    <h3 class="settingLabel">{{settingInfo.label}}</h3>
    <p class="settingDesc">{{settingInfo.description}}</p>
    <p class="settingAcceptedValuesDesc" v-if="settingInfo.acceptedValues.description">{{settingInfo.acceptedValues.description}}</p>

    <component :is="getComponentName(settingInfo.type)" v-model="settingValue" :categoryId="categoryId" :settingId="settingId"></component>    
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'
import {TSettingInfo} from '../../store/settingsData'

import KeybindComponent from './inputs/Keybind.vue'
import NumberComponent from './inputs/Number.vue'

@Component({components: {KeybindComponent, NumberComponent}})
export default class Setting extends Vue {
  @Prop(String) categoryId!: string
  @Prop(String) settingId!: string
  get settingInfo (): TSettingInfo {
    return this.$store.state.settings.defaultSettings[this.categoryId].settings[this.settingId]
  }
  get isNotDefault (): boolean {
    return !this.$store.getters.isSettingValueDefault(this.categoryId, this.settingId)
  }

  get settingValue (): number {
    return this.$store.getters.settingValue(this.categoryId, this.settingId)
  }

  set settingValue (settingValue: number) {
    this.$store.commit('setSettingValue', {categoryId: this.categoryId, settingId: this.settingId, settingValue})
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
