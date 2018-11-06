<template>
  <div id="settings">
    <h1>Settings</h1>
    <SettingsNavComponent></SettingsNavComponent>

    <div id="categories">
      <div class="category" v-for="(category, categoryId) in settings" :key="categoryId" :id="categoryId">
        <h2 class="categoryLabel">{{category.label}}</h2>
        <p class="categoryDesc">{{category.description}}</p>

        <SettingComponent v-for="(settingInfo, settingId) in category.settings" :key="settingId" :settingId="settingId" :categoryId="categoryId"></SettingComponent>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import {ISettingsCategories} from '../../store/settingsData'

import SettingsNavComponent from './SettingsNav.vue'
import SettingComponent from './Setting.vue'

@Component({components: {SettingsNavComponent, SettingComponent}})
export default class Settings extends Vue {
    get settings (): ISettingsCategories {
    return this.$store.state.settings.defaultSettings
  }
}
</script>
