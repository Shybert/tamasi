<template>
  <div class="inputKeybind">
    <div class="inputError" v-if="inputError">{{inputError}}</div>
    <input class="settingKeybind" :value="selectedKeys || inputError ? selectedKeys : keybind" readonly>
    <button class="recordKeybind" :class="{active: isSelected}" @keydown.prevent="handleKeydown" @keyup.prevent="handleKeyup" @click.prevent="switchRecordingKeybindInput">Edit keybind</button>    
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'
import KeypressService from '../../../utils/keypressService'

@Component
export default class Keybind extends Vue {
  @Prop(String) categoryId!: string
  @Prop(String) settingId!: string
  get keybind (): string {
    return this.$store.getters.settingValue(this.categoryId, this.settingId)
  }
  get isSelected (): boolean {
    return this.$store.state.settings.recordingKeybindInput === `${this.categoryId}.${this.settingId}`
  }

  keypressService = new KeypressService()
  get selectedKeys (): string {
    return this.keypressService.selectedKeys
  }
  get inputError (): string | null {
    return this.keypressService.errorMessage
  }

  handleKeydown (event: KeyboardEvent): void {
    if (!this.isSelected) return
    this.keypressService.keydown(event.key)
  }
  handleKeyup (event: KeyboardEvent): void {
    if (!this.isSelected) return
    this.keypressService.keyup(event.key)
  }

  switchRecordingKeybindInput (): void {
    if (this.isSelected) {
      if (this.selectedKeys) this.$store.commit('setSettingValue', {categoryId: this.categoryId, settingId: this.settingId, settingValue: this.selectedKeys})
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

