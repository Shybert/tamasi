<template>
  <div v-if="inputType === 'enum'" class="settingInput">
    <div class="inputError" v-if="inputError">{{inputError}}</div>
    <select v-model="settingValue">
      <option v-for="value in acceptedValues" :value="value" :key="value">
        {{value}}
      </option>
    </select>
  </div>

  <div v-else class="settingInput">
    <div class="inputError" v-if="inputError">{{inputError}}</div>
  
    <input v-if="inputType === 'number'" type="number" v-model.number="settingValue">
    <InputKeybindComponent v-else-if="inputType === 'keybind'" v-model="settingValue" :identifier="`${categoryId}.${settingId}`"></InputKeybindComponent>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'

import InputKeybindComponent from './InputKeybind.vue'

@Component({components: {InputKeybindComponent}})
export default class SettingInput extends Vue {
  @Prop(String) categoryId!: string
  @Prop(String) settingId!: string
  @Prop(String) inputType!: string
  @Prop() acceptedValues: string | undefined

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
