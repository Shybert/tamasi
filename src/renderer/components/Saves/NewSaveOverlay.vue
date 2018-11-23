<template>
  <div class="newSaveOverlay">
    <h2>New Save Overlay</h2>

    <div class="inputError" v-if="inputError">{{inputError}}</div>
    <input id="newSaveName" v-model="newSaveName" placeholder="New Save Name" required>
    <button @click="createSave" id="createSave">Create New Save</button>

    <button @click="closeOverlay" id="closeOverlay">Close Overlay</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'

@Component
export default class NewSaveOverlay extends Vue {
  @Prop({type: String, required: true}) gameId!: string
  newSaveName: string = ''
  inputError: string | null = null

  createSave (): void {
    this.inputError = null
    if (!this.newSaveName) {
      this.inputError = 'A name for the save is required.'
      return
    }

    this.$store.dispatch('createSave', {gameId: this.gameId, saveName: this.newSaveName})
  }

  closeOverlay (): void {
    this.$store.commit('toggleNewSaveOverlay', {showNewSaveOverlay: false})
  }
}
</script>

<style scoped>
.inputError {
  color: red;
}
</style>
