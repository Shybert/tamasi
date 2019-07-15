<template>
  <section class="saves">
    <div v-if="gameId">
      <NewSaveOverlayComponent
        v-if="showNewSaveOverlay"
        @close="showNewSaveOverlay = false"
        :gameId="gameId"
      />
      <button @click="showNewSaveOverlay = true" id="openNewSaveOverlay">
        Open New Save Overlay
      </button>

      <SavesListComponent :gameId="gameId" />
    </div>
    <div v-else>
      <p>You have not selected a game.</p>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

import NewSaveOverlayComponent from '@/components/Saves/NewSaveOverlay.vue'
import SavesListComponent from '@/components/Saves/SavesList.vue'

@Component({ components: { NewSaveOverlayComponent, SavesListComponent } })
export default class Saves extends Vue {
  @Prop({ type: String }) gameId: string | undefined

  showNewSaveOverlay: boolean = false
}
</script>
