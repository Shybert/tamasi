<template>
  <div id="settings">
    <h1>Settings</h1>
    <SettingsNavComponent></SettingsNavComponent>

    <CategoriesComponent></CategoriesComponent>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator'

import SettingsNavComponent from './SettingsNav.vue'
import CategoriesComponent from './Categories.vue'

@Component({components: {SettingsNavComponent, CategoriesComponent}})
export default class Settings extends Vue {}
</script>
