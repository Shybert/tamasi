<template>
  <section class="saves">
    <NewSaveOverlayComponent
      v-if="showNewSaveOverlay"
      @close="showNewSaveOverlay = false"
    />
    <button @click="showNewSaveOverlay = true" id="openNewSaveOverlay">
      Open New Save Overlay
    </button>

    <SavesListComponent />
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import NewSaveOverlayComponent from '@/components/Saves/NewSaveOverlay.vue'
import SavesListComponent from '@/components/Saves/SavesList.vue'

@Component({ components: { NewSaveOverlayComponent, SavesListComponent } })
export default class Saves extends Vue {
  showNewSaveOverlay: boolean = false
}
</script>
