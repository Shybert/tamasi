<template>
  <InputIntegerComponent v-if="settingInfo.type === 'integer'" v-model="settingValue" :settingInfo="settingInfo"></InputIntegerComponent>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'
import {TSettingTypes} from '../../store/settingsData'
import {settingsStore} from '../../store/modules/settingsStore'

import InputIntegerComponent from './InputInteger.vue'

const Super = Vue.extend({
  computed: settingsStore.mapGetters(['getSettingValue']),
  methods: settingsStore.mapMutations(['setSettingValue'])
})
@Component({components: {InputIntegerComponent}})
export default class Inputs extends Super {
  @Prop({type: Object, required: true}) settingInfo!: TSettingTypes

  get settingValue () {
    return this.getSettingValue(this.settingInfo.id)
  }
  set settingValue (value: TSettingTypes['defaultValue']) {
    this.setSettingValue({settingId: this.settingInfo.id, value})
  }
}
</script>
