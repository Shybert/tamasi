<template>
  <div id="app">
    <TitleBarComponent v-if="!isOverlay"></TitleBarComponent>
    <NavComponent v-if="!isOverlay"></NavComponent>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'

import TitleBarComponent from './components/TitleBar.vue'
import NavComponent from './components/Nav.vue'

@Component({components: {NavComponent, TitleBarComponent}})
export default class App extends Vue {
  @Prop({type: Boolean, required: true}) isOverlay!: boolean
}
</script>

<style>
* {
  margin: 0;
}
</style>
