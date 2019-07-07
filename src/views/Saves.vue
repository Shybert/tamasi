<template>
  <section class="saves">
    <div v-if="gameId">
      <NewSaveOverlayComponent v-if="showNewSaveOverlay" :gameId="gameId" />
      <button
        @click="toggleNewSaveOverlay({ showNewSaveOverlay: true })"
        id="openNewSaveOverlay"
      >
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
import { saves } from '@/store/modules/savesStore'

import NewSaveOverlayComponent from '@/components/Saves/NewSaveOverlay.vue'
import SavesListComponent from '@/components/Saves/SavesList.vue'

const Super = Vue.extend({
  computed: saves.mapState(['showNewSaveOverlay']),
  methods: saves.mapMutations(['toggleNewSaveOverlay'])
})
@Component({ components: { NewSaveOverlayComponent, SavesListComponent } })
export default class Saves extends Super {
  @Prop({ type: String }) gameId: string | undefined
}
</script>
