<template>
  <div id="app">
    <TitleBarComponent v-if="!isOverlay" />
    <div id="content">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import TitleBarComponent from '@/components/TitleBar.vue'

@Component({ components: { TitleBarComponent } })
export default class App extends Vue {
  get isOverlay(): boolean {
    return this.$route.path.startsWith('/overlay')
  }
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
