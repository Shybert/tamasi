<template>
  <ul>
    <li v-for="(game, gameId) in games" :key="gameId">
      <router-link :to="`/saves/${gameId}`">{{game.name}}</router-link>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'
import * as data from '../../storage/data'

@Component
export default class GameList extends Vue {
  @Prop(Object) games!: data.IGames
}
</script>

