<template>
  <ul>
    <li v-for="(save, saveId) in saveList" :key="saveId" @click="loadOverlayWindow(saveId)">
      {{save.name}}
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'
import {ipcRenderer} from 'electron'
import * as saves from '../../storage/saves'

@Component
export default class SaveList extends Vue {
  @Prop() saveList!: saves.ISaves

  loadOverlayWindow (saveId: string): void {
    ipcRenderer.send('loadOverlayWindow', this.$route.params.gameId, saveId)
  }
}
</script>
