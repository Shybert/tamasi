<template>
  <div class="inputInteger">
    <div class="inputError" v-if="!settingValueValidation.valid">{{settingValueValidation.errorMessage}}</div>
    <input type="number" :value="localSettingValue" @input="handleInput" step="1" :min="settingInfo.min" :max="settingInfo.max">
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'
import {ISettingInteger, validateSettingValue} from '../../store/settingsData'

@Component
export default class InputInteger extends Vue {
  @Prop({type: Object, required: true}) settingInfo!: ISettingInteger
  @Prop({type: Number, required: true}) value!: number

  localSettingValue = this.value
  get settingValueValidation () {
    return validateSettingValue(this.settingInfo, this.localSettingValue)
  }

  handleInput (event: any) { // Missing InputEvent interface
    this.localSettingValue = Number.parseFloat(event.target.value)
    if (this.settingValueValidation.valid) this.$emit('input', this.localSettingValue)
  }
}
</script>

<style scoped>
.inputError {
  color: red;
}
</style>
