<template>
  <nav id="settingsNav">
    <ul>
      <li v-for="(category, categoryId) in settingCategories" :key="categoryId">
        <a :href="`#${categoryId}`">{{ category.label }}</a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { settingCategories } from '../../store/settingsData'

@Component
export default class SettingsNav extends Vue {
  settingCategories = settingCategories
}
</script>
