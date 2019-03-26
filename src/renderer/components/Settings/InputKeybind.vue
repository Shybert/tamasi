<template>
  <div class="inputKeybind">
    <input type="text" :value="isRecording ? keypressService.keybind : settingInfo.settingValue" readonly>
    <button type="button" :class="{active: isRecording}" @keydown.prevent="handleKeydown" @keyup.prevent="handleKeyup" @click.prevent="switchRecordingKeybindInput" @blur="stopRecordingKeybindInput">Edit keybind</button>    
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'
import KeypressService from '../../utils/keypressService'
import {SettingKeybind} from '../../settings/settingsService'

@Component
export default class InputKeybind extends Vue {
  @Prop({type: Object, required: true}) settingInfo!: SettingKeybind

  isRecording: boolean = false

  keypressService = new KeypressService()

  handleKeydown (key: KeyboardEvent): void {
    this.keypressService.keydown(key)
  }
  handleKeyup (key: KeyboardEvent): void {
    this.keypressService.keyup(key)
  }

  saveKeybind (): void {
    this.settingInfo.userSettingValue = this.keypressService.keybind
  }

  stopRecordingKeybindInput (): void {
    this.isRecording = false
    // Only save keybind if there was any input
    if (this.keypressService.keybind) this.saveKeybind()
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
