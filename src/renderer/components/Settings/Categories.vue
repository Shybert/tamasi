<template>
  <div id="categories">
    <div v-for="(category, categoryId) in categories" :key="categoryId" class="category">
      <h2 class="categoryLabel">{{category.label}}</h2>
      <p class="categoryDesc">{{category.description}}</p>

      <CategorySettingsComponent :categoryId="categoryId"></CategorySettingsComponent>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import {ISettingsCategories} from '../../store/settingsData'

import CategorySettingsComponent from './CategorySettings.vue'

@Component({components: {CategorySettingsComponent}})
export default class Categories extends Vue {
  get categories (): ISettingsCategories {
    return this.$store.state.settings.defaultSettings
  }
}
</script>
