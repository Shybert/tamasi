<template>
  <div id="app">
    <NavComponent v-if="!isOverlay"></NavComponent>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'

import NavComponent from './components/Nav.vue'

@Component({components: {NavComponent}})
export default class App extends Vue {
  @Prop({type: Boolean, required: true}) isOverlay!: boolean
}
</script>

