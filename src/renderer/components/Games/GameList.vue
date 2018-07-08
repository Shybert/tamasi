<template>
  <ul>
    <li v-for="game in games" :key="game.id">{{game.name}}</li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: ['games']
})
</script>

