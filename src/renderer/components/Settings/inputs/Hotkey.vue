<template>
  <div class="inputHotkey">
    <div class="inputError" v-if="inputError">{{inputError}}</div>
    <button class="settingHotkey" :class="{active: isSelected}" @keyup="setHotkey" @click="selectOrDeselectHotkeyInput">{{hotkey}}</button>    
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'

@Component
export default class Hotkey extends Vue {
  @Prop(String) categoryId!: string
  @Prop(String) settingId!: string
  get hotkey (): string {
    return this.$store.getters.settingValue(this.categoryId, this.settingId)
  }
  get isSelected (): boolean {
    return this.$store.state.settings.hotkeyInputSelected === `${this.categoryId}.${this.settingId}`
  }

  inputError: string | null = null
  validateInput (key: string): void {
    this.inputError = null

    if (!this.$store.getters.isSettingValueAccepted(this.categoryId, this.settingId, key)) this.inputError = `The key "${key}" cannot be used as a hotkey.`
    if (this.$store.getters.hotkeys.includes(key)) this.inputError = `The key "${key}" is already being used.`
  }

  setHotkey (event: KeyboardEvent): void {
    if (!this.isSelected) return
    this.validateInput(event.key)
    if (this.inputError) return

    this.$store.commit('setSettingValue', {categoryId: this.categoryId, settingId: this.settingId, settingValue: event.key})
    this.$store.commit('deselectHotkeyInput')

  }
  selectOrDeselectHotkeyInput (): void {
    if (this.isSelected) this.$store.commit('deselectHotkeyInput')
    else this.$store.commit('selectHotkeyInput', {categoryId: this.categoryId, settingId: this.settingId})
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

