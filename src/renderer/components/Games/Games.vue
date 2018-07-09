<template>
  <div id="games">
    <GameListComponent :games="games"></GameListComponent>    
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import * as data from '../../storage/data'

import GameListComponent from './GameList.vue'

export default Vue.extend({
  data () {
    return {
      games: data.getGameNames()
    }
  },
  components: {GameListComponent}
})
</script>

