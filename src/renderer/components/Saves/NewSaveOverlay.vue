<template>
  <div class="newSaveOverlay">
    <h2>New Save Overlay</h2>
    <input v-model="newSaveName" placeholder="New Save Name">
    <button @click="createNewSave">Create New Save</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data () {
    return {
      newSaveName: ''
    }
  },
  methods: {
    createNewSave () {
      this.$emit('createNewSave', this.$data.newSaveName)
    }
  }
})
</script>

