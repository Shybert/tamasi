<template>
  <div id="categories">
    <div v-for="(category, categoryId) in settingsCategories" :key="categoryId" class="category">
      <h2 class="categoryLabel">{{category.label}}</h2>
      <p class="categoryDesc">{{category.description}}</p>

      <SettingComponent v-for="(settingInfo, settingId) in category.settings" :key="settingId" :settingId="settingId" :categoryId="categoryId"></SettingComponent>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import {ISettingsCategories} from '../../store/settingsData'

import SettingComponent from './Setting.vue'

@Component({components: {SettingComponent}})
export default class Categories extends Vue {
  get settingsCategories (): ISettingsCategories {
    return this.$store.state.settings.defaultSettings
  }
}
</script>
