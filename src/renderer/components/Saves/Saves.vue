<template>
  <div class="saves">
    <NewSaveOverlayComponent v-if="showNewSaveOverlay"></NewSaveOverlayComponent>
    <button @click="openNewSaveOverlay" id="openNewSaveOverlay">Open New Save Overlay</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator'

import NewSaveOverlayComponent from './NewSaveOverlay.vue'

@Component({components: {NewSaveOverlayComponent}})
export default class Saves extends Vue {
  get showNewSaveOverlay (): boolean {
    return this.$store.state.saves.showNewSaveOverlay
  }

  openNewSaveOverlay (): void {
    this.$store.commit('toggleNewSaveOverlay', {showNewSaveOverlay: true})
  }
}
</script>

