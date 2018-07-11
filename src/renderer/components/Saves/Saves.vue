<template>
  <div class="saves">
    <NewSaveOverlayComponent v-if="showNewSaveOverlay" @createNewSave="createNewSave"></NewSaveOverlayComponent>
    <button @click="openNewSaveOverlay">Open New Save Overlay</button>

    <SaveListComponent :saveList="saveList"></SaveListComponent>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import * as saves from '../../storage/saves'

import SaveListComponent from './SaveList.vue'
import NewSaveOverlayComponent from './NewSaveOverlay.vue'

export default Vue.extend({
  data () {
    return {
      saveList: saves.getSaves(this.$route.params.gameId),
      showNewSaveOverlay: false
    }
  },
  methods: {
    openNewSaveOverlay () {
      this.$data.showNewSaveOverlay = true
    },
    createNewSave (saveName: string) {
      saves.createSave(this.$route.params.gameId, saveName)

      // Redisplay the save list now that a new save has been created
      this.$data.saveList = saves.getSaves(this.$route.params.gameId)
      this.$data.showNewSaveOverlay = false
    }
  },
  components: {SaveListComponent, NewSaveOverlayComponent}
})
</script>

