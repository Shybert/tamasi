<template>
  <div class="inputNumber">
    <div class="inputError">{{inputError}}</div>
    <input type="number" :value="value" @input="input(parseFloat($event.target.value))">
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'

@Component
export default class Number extends Vue {
  @Prop() value!: any
  @Prop(String) categoryId!: string
  @Prop(String) settingId!: string

  inputError: string | null = null
  validate (settingValue: any): void {
    this.inputError = null
    const errorMessage: string | null = this.$store.getters.validateSettingValue(this.categoryId, this.settingId, settingValue)
    if (errorMessage) this.inputError = errorMessage
  }
  input (settingValue: any): void {
    this.validate(settingValue)
    this.$emit('input', settingValue)
  }

  created () {
    this.validate(this.value)
  }
}
</script>

<style scoped>
.inputError {
  color: red;
}
</style>
