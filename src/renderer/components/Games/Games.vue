<template>
  <div id="games">
    <GameListComponent></GameListComponent>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator'

import GameListComponent from './GameList.vue'

@Component({components: {GameListComponent}})
export default class Games extends Vue {}
</script>

