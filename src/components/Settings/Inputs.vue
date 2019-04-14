<template>
  <div class="settingInput">
    <div class="inputError" v-if="!settingValueValidation.valid">
      {{ settingValueValidation.errorMessage }}
    </div>

    <input
      v-if="settingInfo.type === 'integer'"
      type="number"
      v-model.number="settingValue"
      step="1"
      :min="settingInfo.min"
      :max="settingInfo.max"
    />
    <InputKeybindComponent
      v-else-if="settingInfo.type === 'keybind'"
      v-model="settingValue"
    />
    <input
      v-else-if="settingInfo.type === 'checkbox'"
      type="checkbox"
      v-model="settingValue"
    />
    <select v-else-if="settingInfo.type === 'enum'" v-model="settingValue">
      <option
        v-for="value in settingInfo.acceptedValues"
        :key="value.id"
        :value="value.id"
      >
        {{ value.name }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { TSettingTypes, validateSettingValue } from '@/store/settingsData'
import { settingsStore } from '@/store/modules/settingsStore'

import InputKeybindComponent from './InputKeybind.vue'

const Super = Vue.extend({
  computed: settingsStore.mapGetters(['getUserSettingValue']),
  methods: settingsStore.mapMutations(['setSettingValue'])
})
@Component({ components: { InputKeybindComponent } })
export default class Inputs extends Super {
  @Prop({ type: Object, required: true }) settingInfo!: TSettingTypes

  get settingValue() {
    return this.getUserSettingValue(this.settingInfo.id)
  }
  set settingValue(value: any) {
    this.setSettingValue({ settingId: this.settingInfo.id, value })
  }

  get settingValueValidation() {
    return validateSettingValue(this.settingInfo, this.settingValue)
  }
}
</script>

<style scoped>
.inputError {
  color: red;
}
</style>
