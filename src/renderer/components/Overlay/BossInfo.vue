<template>
  <ul>
    <li id="bossName">Name: {{bossInfo.name}}</li>
    <li id="bossTime">Time: {{bossInfo.time}}</li>
    <li id="bossDeaths">Deaths: {{bossInfo.deaths}}</li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: ['bossInfo']
})
</script>

