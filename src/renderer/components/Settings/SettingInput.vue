<template>
  <div v-if="settingInfo.Type === 'enum'" class="settingInput">
    <div class="inputError" v-if="inputError">{{inputError}}</div>
    <select v-model="settingValue">
      <option v-for="value in acceptedValues" :value="value" :key="value">
        {{value}}
      </option>
    </select>
  </div>

  <div v-else-if="settingInfo.type === 'checkbox'" class="settingInput">
    <div class="inputError" v-if="inputError">{{inputError}}</div>
    <input type="checkbox" v-model="settingValue">
  </div>

  <div v-else class="settingInput">
    <div class="inputError" v-if="inputError">{{inputError}}</div>
  
    <input v-if="settingInfo.type === 'number'" type="number" v-model.number="settingValue" :min="settingInfo.min" :max="settingInfo.max">
    <InputKeybindComponent v-else-if="settingInfo.type === 'keybind'" v-model="settingValue" :identifier="`${categoryId}.${settingId}`"></InputKeybindComponent>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'
import {TSettingInfo} from '../../store/settingsData'

import InputKeybindComponent from './InputKeybind.vue'

@Component({components: {InputKeybindComponent}})
export default class SettingInput extends Vue {
  @Prop(String) categoryId!: string
  @Prop(String) settingId!: string
  @Prop(Object) settingInfo!: TSettingInfo

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
