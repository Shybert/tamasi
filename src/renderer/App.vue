<template>
  <div id="app">
    <TitleBarComponent v-if="!isOverlay"></TitleBarComponent>
    <h1>{{aSetting.settingValue}}</h1>
    <button @click="aSetting.setSettingValue([0, 1])">Set setting</button>
    <NavComponent v-if="!isOverlay"></NavComponent>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'
import Settings from './settingsData'

import TitleBarComponent from './components/TitleBar.vue'
import NavComponent from './components/Nav.vue'

@Component({components: {NavComponent, TitleBarComponent}})
export default class App extends Vue {
  @Prop({type: Boolean, required: true}) isOverlay!: boolean

  aSetting = Settings.keybinds.incrementDeaths
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
