<template>
  <div class="newSaveOverlay">
    <h2>New Save Overlay</h2>
    <input id="newSaveName" v-model="newSaveName" placeholder="New Save Name">
    <button @click="createSave" id="createSave">Create New Save</button>
    <button @click="closeOverlay" id="closeOverlay">Close Overlay</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator'

@Component
export default class NewSaveOverlay extends Vue {
  newSaveName: string = ''

  createSave (): void {
    this.$emit('createNewSave', this.newSaveName)
  }

  closeOverlay (): void {
    this.$emit('closeOverlay')
  }
}
</script>

