<template>
  <nav id="settingsNav">
    <ul>
      <li v-for="(category, categoryId) in categories" :key="categoryId" class="category">
        <a :href="`#${categoryId}`">{{category.label}}</a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import {ISettingsCategories} from '../../store/settingsData'

@Component
export default class SettingsNav extends Vue {
  get categories (): ISettingsCategories {
    return this.$store.state.settings.defaultSettings
  }
}
</script>
