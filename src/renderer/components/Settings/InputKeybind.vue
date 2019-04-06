<template>
  <div class="inputKeybind">
    <div class="inputError" v-if="isRecording && !settingValueValidation.valid">{{settingValueValidation.errorMessage}}</div>
    <input type="text" :value="isRecording ? keypressService.keybind : value" readonly>
    <button type="button" :class="{active: isRecording}" @keydown.prevent="handleKeydown" @keyup.prevent="handleKeyup" @click.prevent="switchRecordingKeybindInput" @blur="stopRecordingKeybindInput">Edit keybind</button>    
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'
import KeypressService from '../../utils/keypressService'
import {ISettingKeybind, validateSettingValue} from '../../store/settingsData'

@Component
export default class InputKeybind extends Vue {
  @Prop({type: Object, required: true}) settingInfo!: ISettingKeybind
  @Prop({type: String, required: true}) value!: number

  isRecording: boolean = false

  keypressService = new KeypressService()
  get settingValueValidation () {
    return validateSettingValue(this.settingInfo, this.keypressService.keybind)
  }

  handleKeydown (key: KeyboardEvent): void {
    this.keypressService.keydown(key)
  }
  handleKeyup (key: KeyboardEvent): void {
    this.keypressService.keyup(key)
  }

  stopRecordingKeybindInput (): void {
    if (!this.isRecording) return

    // Only change keybind if it's valid
    if (this.settingValueValidation.valid) this.$emit('input', this.keypressService.keybind)
    this.isRecording = false
    this.keypressService.reset()
  }
  switchRecordingKeybindInput (): void {
    if (this.isRecording) this.stopRecordingKeybindInput()
    else this.isRecording = true
  }
}
</script>

<style scoped>
.active {
  border: 4px solid green;
}
.inputError {
  color: red;
}
</style>
