<template>
  <ul>
    <li v-for="(save, saveId) in saveList" :key="saveId" @click="loadOverlayWindow(saveId)">
      {{save.name}}
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue'
import {ipcRenderer} from 'electron'

export default Vue.extend({
  props: ['saveList'],
  methods: {
    loadOverlayWindow (saveId: string) {
      ipcRenderer.send('loadOverlayWindow', this.$route.params.gameId, saveId)
    }
  }
})
</script>
