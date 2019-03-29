<template>
  <div class="saves">
    <NewSaveOverlayComponent v-if="showNewSaveOverlay" :gameId="gameId"></NewSaveOverlayComponent>
    <button @click="toggleNewSaveOverlay({showNewSaveOverlay: true})" id="openNewSaveOverlay">Open New Save Overlay</button>

    <SavesListComponent :gameId="gameId"></SavesListComponent>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'
import {saves} from '../../store/modules/savesStore'

import NewSaveOverlayComponent from './NewSaveOverlay.vue'
import SavesListComponent from './SavesList.vue'

const Super = Vue.extend({
  computed: saves.mapState(['showNewSaveOverlay']),
  methods: saves.mapMutations(['toggleNewSaveOverlay'])
})
@Component({components: {NewSaveOverlayComponent, SavesListComponent}})
export default class Saves extends Super {
  @Prop({type: String, required: true}) gameId!: string
}
</script>

