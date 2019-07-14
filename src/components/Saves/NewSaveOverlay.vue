<template>
  <div class="newSaveOverlay">
    <h2>New Save Overlay</h2>

    <div class="inputError" v-if="inputError">{{ inputError }}</div>
    <input
      id="newSaveName"
      v-model="newSaveName"
      placeholder="New Save Name"
      required
    />
    <button @click="localCreateSave" id="createSave">Create New Save</button>

    <button @click="$emit('close')" id="closeOverlay">Close Overlay</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { saves } from '@/store/modules/savesStore'

const Super = Vue.extend({
  methods: saves.mapActions(['createSave'])
})
@Component
export default class NewSaveOverlay extends Super {
  @Prop({ type: String, required: true }) gameId!: string
  newSaveName: string = ''
  inputError: string | null = null

  localCreateSave(): void {
    this.inputError = null
    if (!this.newSaveName) {
      this.inputError = 'A name for the save is required.'
      return
    }

    this.createSave({ gameId: this.gameId, saveName: this.newSaveName }).then(
      () => {
        this.$emit('close')
      }
    )
  }
}
</script>

<style scoped>
.inputError {
  color: red;
}
</style>
