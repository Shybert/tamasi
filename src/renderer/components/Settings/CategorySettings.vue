<template>
  <div class="categorySettings">
    <div v-for="(settingInfo, settingId) in categorySettings" :key="settingId" class="setting">
      <h3 class="settingLabel">{{settingInfo.label}}</h3>
      <p class="settingDesc">{{settingInfo.description}}</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'
import {ISettings} from '../../store/settingsData'

@Component
export default class Setting extends Vue {
  @Prop(String) categoryId!: string
  get categorySettings (): ISettings {
    return this.$store.state.settings.defaultSettings[this.categoryId].settings
  }
}
</script>
