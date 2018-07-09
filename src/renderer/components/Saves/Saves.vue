<template>
  <SaveListComponent :saveList="saveList"></SaveListComponent>
</template>

<script lang="ts">
import Vue from 'vue'
import * as saves from '../../storage/saves'

import SaveListComponent from './SaveList.vue'

export default Vue.extend({
  data () {
    return {
      saveList: saves.getSaves(this.$route.params.id)
    }
  },
  components: {SaveListComponent}
})
</script>

