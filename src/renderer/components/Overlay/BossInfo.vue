<template>
  <ul>
    <li id="bossName">{{bossInfo.name}}</li>
    <li id="bossTime">{{bossInfo.time}}</li>
    <li id="bossDeaths">{{bossInfo.deaths}}</li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: ['bossInfo']
})
</script>

