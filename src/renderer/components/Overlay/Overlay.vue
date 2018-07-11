<template>
  <div id="overlay">
    <h1>Game ID: {{gameId}}</h1>
    <h1>Save ID: {{saveId}}</h1>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data () {
    return {
      gameId: this.$route.params.gameId,
      saveId: this.$route.params.saveId
    }
  }
})
</script>

