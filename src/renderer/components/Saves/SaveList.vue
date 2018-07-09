<template>
  <ul>
    <li v-for="save in saveList" :key="save.id">
      {{save.name}}
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: ['saveList']
})
</script>
