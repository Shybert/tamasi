<template>
  <ul>
    <li v-for="(game, gameId) in games" :key="gameId">
      <router-link :to="`/saves/${gameId}`">{{game.name}}</router-link>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator'

@Component
export default class GameList extends Vue {
  get games () {
    return this.$store.state.games.games
  }
}
</script>

