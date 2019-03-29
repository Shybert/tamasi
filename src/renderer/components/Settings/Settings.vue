<template>
  <div id="settings">
    <h1>Settings</h1>
    <SettingsNavComponent></SettingsNavComponent>

    <div id="categories">
      <section class="category" v-for="(category, categoryId) in settingCategories" :key="categoryId" :id="categoryId">
        <h2 class="categoryLabel">{{category.label}}</h2>
        <p class="categoryDescription">{{category.description}}</p>

        <div class="settings">
          <section class="setting" v-for="setting in category.settings" :key="setting.id">
            <h3 class="settingLabel">{{setting.label}}</h3>
            <p class="settingDescription">{{setting.description}}</p>
          </section>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import {settingCategories} from '../../store/settingsData'

import SettingsNavComponent from './SettingsNav.vue'

@Component({components: {SettingsNavComponent}})
export default class Settings extends Vue {
  settingCategories = settingCategories
}
</script>

<style scoped>
.changed {
  background-color: dimgray;
}
</style>
