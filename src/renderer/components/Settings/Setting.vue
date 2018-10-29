<template>
  <div class="setting" :class="{changed: isNotDefault}">
    <h3 class="settingLabel">{{settingInfo.label}}</h3>
    <p class="settingDesc">{{settingInfo.description}}</p>
    <p class="settingAcceptedValuesDesc" v-if="settingInfo.acceptedValues.description">{{settingInfo.acceptedValues.description}}</p>

    <p class="inputError" v-if="inputError">{{inputError}}</p>
    <component :is="getComponentName(settingInfo.type)" v-model="settingValue"></component>    
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

  inputError: string | null = null
  validate (settingValue: any): void {
    this.inputError = null
    const errorMessage: string | null = this.$store.getters.validateSettingValue(this.categoryId, this.settingId, settingValue)
    if (errorMessage) this.inputError = errorMessage
  }

  get settingValue (): number {
    return this.$store.getters.settingValue(this.categoryId, this.settingId)
  }

  set settingValue (settingValue: number) {
    this.validate(settingValue)
    this.$store.commit('setSettingValue', {categoryId: this.categoryId, settingId: this.settingId, settingValue})
  }

  getComponentName (type: string): string {
    const capitalizedType: string = `${type[0].toUpperCase()}${type.slice(1)}`
    return `${capitalizedType}Component`
  }

  created () {
    this.validate(this.settingValue)
  }
}
</script>

<style scoped>
.changed {
  background-color: dimgray;
}
.inputError {
  color: red;
}
</style>
