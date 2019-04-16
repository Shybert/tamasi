<template>
  <div id="app">
    <TitleBarComponent v-if="!isOverlay" />
    <div id="content">
      <NavComponent v-if="!isOverlay" />
      <router-view />
    </div>
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

<style lang="scss" scoped>
#content {
  height: calc(100vh - #{$titleBarHeight});
  box-sizing: border-box;
  padding: 0.5em;
  overflow: auto;
}
</style>
<style>
body {
  margin: 0;
}
</style>
