<template>
  <nav>
    <router-link v-for="(game, gameId) in games" :key="gameId" :to="`/saves/${gameId}`">{{game.name}}</router-link>
    <router-link to="/settings" id="settingsLink">Settings</router-link>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator'

@Component
export default class Nav extends Vue {
  get games () {
    return this.$store.state.games.games
  }
}
</script>

<style scoped>
a {
  margin: 0 0.5em;
}
</style>

