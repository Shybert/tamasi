<template>
  <div class="settingInput">
    <div class="inputError" v-if="inputError">{{inputError}}</div>
  
    <input v-if="inputType === 'number'" type="number" v-model.number="settingValue">
    <KeybindComponent v-else-if="inputType === 'keybind'" v-model="settingValue" :identifier="`${categoryId}.${settingId}`"></KeybindComponent>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'

import KeybindComponent from './inputs/Keybind.vue'
import EnumComponent from './inputs/enum.vue'

@Component({components: {KeybindComponent, EnumComponent}})
export default class SettingInput extends Vue {
  @Prop(String) categoryId!: string
  @Prop(String) settingId!: string
  @Prop(String) inputType!: string
  get settingValue (): number {
    return this.$store.getters.literalSettingValue(this.categoryId, this.settingId)
  }
  set settingValue (settingValue: number) {
    this.$store.commit('setSettingValue', {categoryId: this.categoryId, settingId: this.settingId, settingValue})
  }

  get inputError (): string | null {
    return this.$store.getters.validateSettingValue(this.categoryId, this.settingId, this.settingValue)
  }
}
</script>

<style scoped>
.inputError {
  color: red;
}
</style>
