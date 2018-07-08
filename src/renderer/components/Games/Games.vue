<template>
  <div id="games">
    <GameListComponent :games="games"></GameListComponent>    
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import GameListComponent from './GameList.vue'
import * as data from '../../storage/data'

const games = data.getGameNames()

export default Vue.extend({
  data () {
    return {
      games
    }
  },
  components: {GameListComponent}
})
</script>

