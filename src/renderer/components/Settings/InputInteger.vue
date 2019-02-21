<template>
  <div class="inputInteger">
    <input type="number" v-model.number="settingInfo.userSettingValue" step="1" :min="settingInfo.min" :max="settingInfo.max">
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'
import {SettingInteger} from '../../settings/settingsService'

@Component
export default class InputInteger extends Vue {
  @Prop(Object) settingInfo!: SettingInteger
}
</script>
