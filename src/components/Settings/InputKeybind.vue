<template>
  <div class="inputKeybind">
    <input type="text" :value="isRecording ? keybind : value" readonly />
    <button
      type="button"
      :class="{ active: isRecording }"
      @keydown.prevent="keypressService.keydown"
      @keyup.prevent="keypressService.keyup"
      @click.prevent="switchRecordingKeybindInput"
      @blur="stopRecordingKeybindInput"
    >
      Edit keybind
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import KeypressService from '@/utils/keypressService'

@Component
export default class InputKeybind extends Vue {
  @Prop({ type: String, required: true }) value!: number

  isRecording: boolean = false

  keypressService = new KeypressService()
  get keybind() {
    const keybind = this.keypressService.keybind
    this.$emit('input', keybind)
    return keybind
  }

  stopRecordingKeybindInput(): void {
    if (!this.isRecording) return
    this.isRecording = false
    this.keypressService.reset()
  }
  switchRecordingKeybindInput(): void {
    if (this.isRecording) this.stopRecordingKeybindInput()
    else this.isRecording = true
  }
}
</script>

<style scoped>
.active {
  border: 4px solid green;
}
</style>
