<template>
  <div id="settings">
    <h1>Settings</h1>
    <SettingsNavComponent></SettingsNavComponent>

    <div id="categories">
      <section class="category" v-for="(category, categoryId) in settingCategories" :key="categoryId" :id="categoryId">
        <h2 class="categoryLabel">{{category.label}}</h2>
        <p class="categoryDescription">{{category.description}}</p>

        <div class="settings">
          <section class="setting" v-for="settingInfo in category.settings" :key="settingInfo.id" :class="{changed: !isSettingValueDefault(settingInfo.id)}">
            <h3 class="settingLabel">{{settingInfo.label}}</h3>
            <p class="settingDescription">{{settingInfo.description}}</p>

            <InputsComponent :settingInfo="settingInfo"></InputsComponent>
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
import {settingsStore} from '../../store/modules/settingsStore'

import SettingsNavComponent from './SettingsNav.vue'
import InputsComponent from './Inputs.vue'

const Super = Vue.extend({
  computed: settingsStore.mapGetters(['isSettingValueDefault'])
})
@Component({components: {SettingsNavComponent, InputsComponent}})
export default class Settings extends Super {
  settingCategories = settingCategories
}
</script>

<style scoped>
.changed {
  background-color: dimgray;
}
</style>
