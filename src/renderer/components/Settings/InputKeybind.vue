<template>
  <div class="inputKeybind">
    <input :value="isRecording ? selectedKeys : value" readonly>
    <button class="recordKeybind" :class="{active: isRecording}" @keydown.prevent="handleKeydown" @keyup.prevent="handleKeyup" @click.prevent="switchRecordingKeybindInput">Edit keybind</button>    
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'
import KeypressService from '../../utils/keypressService'

@Component
export default class InputKeybind extends Vue {
  @Prop({required: true}) value: any
  @Prop({type: String, required: true}) identifier!: string

  get isRecording (): boolean {
    return this.$store.state.settings.recordingKeybindInput === this.identifier
  }

  keypressService = new KeypressService()
  get selectedKeys (): string {
    const selectedKeys = this.keypressService.selectedKeys
    this.$emit('input', selectedKeys)
    return selectedKeys
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
    if (this.isRecording) this.$store.commit('stopRecordingKeybindInput')
    else this.$store.commit('recordKeybindInput', this.identifier)

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

