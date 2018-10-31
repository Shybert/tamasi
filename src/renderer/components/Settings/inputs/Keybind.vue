<template>
  <div class="inputKeybind">
    <div class="inputError" v-if="inputError || (keybindErrorMessage && !isRecording)">{{isRecording ? inputError : keybindErrorMessage}}</div>
    <input :value="isRecording ? selectedKeys : value" readonly>
    <button class="recordKeybind" :class="{active: isRecording}" @keydown.prevent="handleKeydown" @keyup.prevent="handleKeyup" @click.prevent="switchRecordingKeybindInput">Edit keybind</button>    
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'
import KeypressService from '../../../utils/keypressService'

@Component
export default class Keybind extends Vue {
  @Prop() value: any
  @Prop(String) categoryId!: string
  @Prop(String) settingId!: string

  get isRecording (): boolean {
    return this.$store.state.settings.recordingKeybindInput === `${this.categoryId}.${this.settingId}`
  }
  get keybindErrorMessage (): string | null {
    return this.$store.getters.validateSettingValue(this.categoryId, this.settingId, this.value)
  }

  keypressService = new KeypressService()
  get selectedKeys (): string {
    return this.keypressService.selectedKeys
  }
  get inputError (): string | null {
    return this.keypressService.errorMessage
  }

  handleKeydown (event: KeyboardEvent): void {
    if (!this.isRecording) return
    this.keypressService.keydown(event.key)
  }
  handleKeyup (event: KeyboardEvent): void {
    if (!this.isRecording) return
    this.keypressService.keyup(event.key)
  }

  switchRecordingKeybindInput (): void {
    if (this.isRecording) {
      this.$emit('input', this.selectedKeys)
      this.$store.commit('stopRecordingKeybindInput')
    }
    else this.$store.commit('recordKeybindInput', {categoryId: this.categoryId, settingId: this.settingId})

    this.keypressService.reset()
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

