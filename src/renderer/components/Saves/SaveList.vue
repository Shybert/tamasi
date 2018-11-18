<template>
  <ul>
    <li v-for="(save, saveId) in saveList" :key="saveId">
      <ul>
        <li @click="loadOverlayWindow(saveId)">{{save.name}}</li>
        <li><router-link :to="`/charts/${gameId}/${saveId}`">Charts</router-link></li>
      </ul>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'
import {ipcRenderer} from 'electron'
import {ISaves} from '../../store/savesData'

@Component
export default class SaveList extends Vue {
  @Prop({type: String, required: true}) gameId!: string

  get saveList (): ISaves {
    return this.$store.state.saves.saves[this.gameId]
  }

  loadOverlayWindow (saveId: string): void {
    ipcRenderer.send('loadOverlayWindow', this.gameId, saveId)
  }
}
</script>
