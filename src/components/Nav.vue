<template>
  <nav>
    <router-link
      v-for="(game, gameId) in games"
      :key="gameId"
      :to="`/${gameId}`"
      >{{ game.name }}</router-link
    >
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { games } from '@/store/gamesData'

@Component
export default class Nav extends Vue {
  games = games
}
</script>

<style scoped>
a {
  margin: 0 0.5em;
}
</style>
