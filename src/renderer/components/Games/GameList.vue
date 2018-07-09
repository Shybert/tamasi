<template>
  <ul>
    <li v-for="game in games" :key="game.id">
      <router-link :to="`/saves/${game.id}`">{{game.name}}</router-link>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: ['games']
})
</script>

