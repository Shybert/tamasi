<template>
  <div id="app">
    <NavComponent></NavComponent>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import NavComponent from './components/Nav.vue'

export default Vue.extend({
  components: {NavComponent}
})
</script>

