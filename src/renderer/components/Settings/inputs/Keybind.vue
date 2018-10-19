<template>
  <div class="inputKeybind">
    <div class="inputError" v-if="inputError">{{inputError}}</div>
    <button class="settingKeybind" :class="{active: isSelected}" @keyup="setKeybind" @click="selectOrDeselectKeybindInput">{{keybind}}</button>    
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'

@Component
export default class Keybind extends Vue {
  @Prop(String) categoryId!: string
  @Prop(String) settingId!: string
  get keybind (): string {
    return this.$store.getters.settingValue(this.categoryId, this.settingId)
  }
  get isSelected (): boolean {
    return this.$store.state.settings.keybindInputSelected === `${this.categoryId}.${this.settingId}`
  }

  inputError: string | null = null
  validateInput (key: string): void {
    this.inputError = null

    if (!this.$store.getters.isSettingValueAccepted(this.categoryId, this.settingId, key)) this.inputError = `The key "${key}" cannot be used as a hotkey.`
    if (this.$store.getters.keybinds.includes(key)) this.inputError = `The key "${key}" is already being used.`
  }

  setKeybind (event: KeyboardEvent): void {
    if (!this.isSelected) return
    this.validateInput(event.key)
    if (this.inputError) return

    this.$store.commit('setSettingValue', {categoryId: this.categoryId, settingId: this.settingId, settingValue: event.key})
    this.$store.commit('deselectKeybindInput')

  }
  selectOrDeselectKeybindInput (): void {
    if (this.isSelected) this.$store.commit('deselectKeybindInput')
    else this.$store.commit('selectKeybindInput', {categoryId: this.categoryId, settingId: this.settingId})
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

