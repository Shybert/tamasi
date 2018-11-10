<template>
  <div id="settings">
    <h1>Settings</h1>
    <SettingsNavComponent></SettingsNavComponent>

    <div id="categories">
      <section class="category" v-for="(category, categoryId) in settings" :key="categoryId" :id="categoryId">
        <h2 class="categoryLabel">{{category.label}}</h2>
        <p class="categoryDesc">{{category.description}}</p>

        <div class="settings">
          <section class="setting" v-for="(settingInfo, settingId) in category.settings" :key="settingId" :class="{changed: !$store.getters.isSettingValueDefault(categoryId, settingId)}">
            <h3 class="settingLabel">{{settingInfo.label}}</h3>
            <p class="settingDesc">{{settingInfo.description}}</p>
            <SettingInputComponent :categoryId="categoryId" :settingId="settingId" :inputType="settingInfo.inputType"></SettingInputComponent>
          </section>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import {ISettingsCategories} from '../../store/settingsData'

import SettingsNavComponent from './SettingsNav.vue'
import SettingInputComponent from './SettingInput.vue'

@Component({components: {SettingsNavComponent, SettingInputComponent}})
export default class Settings extends Vue {
    get settings (): ISettingsCategories {
    return this.$store.state.settings.defaultSettings
  }
}
</script>

<style scoped>
.changed {
  background-color: dimgray;
}
</style>
