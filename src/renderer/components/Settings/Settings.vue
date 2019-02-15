<template>
  <div id="settings">
    <h1>Settings</h1>
    <!-- <SettingsNavComponent></SettingsNavComponent> -->

    <div id="categories">
      <section class="category" v-for="(category, categoryId) in $settings" :key="categoryId" :id="categoryId">
        <!-- <h2 class="categoryLabel">{{category.label}}</h2>
        <p class="categoryDesc">{{category.description}}</p> -->

        <div class="settings">
          <section class="setting" v-for="(setting, settingId) in category" :key="settingId" :class="{changed: !setting.isSettingValueDefault()}">
            <h3 class="settingLabel">{{setting.label}}</h3>
            <p class="settingDesc">{{setting.description}}</p>
            <!-- <SettingInputComponent :categoryId="categoryId" :settingId="settingId" :setting="setting"></SettingInputComponent> -->
          </section>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator'

import SettingsNavComponent from './SettingsNav.vue'
import SettingInputComponent from './SettingInput.vue'

@Component({components: {SettingsNavComponent, SettingInputComponent}})
export default class Settings extends Vue {}
</script>

<style scoped>
.changed {
  background-color: dimgray;
}
</style>
