<template>
  <div id="app">
    <TitleBarComponent v-if="!isOverlay" />
    <NavComponent v-if="!isOverlay" />
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import TitleBarComponent from '@/components/TitleBar.vue'
import NavComponent from '@/components/Nav.vue'

@Component({ components: { NavComponent, TitleBarComponent } })
export default class App extends Vue {
  isOverlay: boolean = window.location.hash.startsWith('#/overlay')
}
</script>

<style scoped>
* {
  margin: 0;
}
</style>
<style>
body {
  margin: 0;
}
</style>
