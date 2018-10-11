<template>
  <button class="settingKey" :class="{active: isSelected}" @keyup="setHotkey" @click="selectKeyInput">{{setting}}</button>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'

@Component
export default class Key extends Vue {
  @Prop(String) categoryId!: string
  @Prop(String) settingId!: string
  get setting (): string {
    return this.$store.getters.getSetting(this.categoryId, this.settingId)
  }
  get isSelected (): boolean {
    return this.$store.state.settings.keyInputSelected === `${this.categoryId}.${this.settingId}`
  }

  setHotkey (event: KeyboardEvent) {
    if (!this.isSelected) return
    this.$store.dispatch('setHotkey', {categoryId: this.categoryId, settingId: this.settingId, setting: event.key})
  }
  selectKeyInput () {
    this.$store.commit('selectKeyInput', {categoryId: this.categoryId, settingId: this.settingId})
  }
}
</script>

<style scoped>
.active {
  border: 4px solid green;
}
</style>

