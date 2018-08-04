<template>
  <div id="games">
    <GameListComponent :games="games"></GameListComponent>    
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import * as data from '../../storage/data'

import GameListComponent from './GameList.vue'

@Component({components: {GameListComponent}})
export default class Games extends Vue {
  get games () {
    return data.getGames()
  }
}
</script>

