<template>
  <ul>
    <li id="bossName">Name: {{bossInfo.name}}</li>
    <li id="bossTime">Time: {{formattedTime}}</li>
    <li id="bossDeaths">Deaths: {{bossInfo.deaths}}</li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: ['bossInfo'],
  computed: {
    formattedTime () {
      const date: Date = new Date(this.bossInfo.time)

      // Convert date to relevant time, then pad it with leading zeroes
      const hours: string = Math.floor(this.bossInfo.time / 3600000).toString().padStart(2, '0')
      const minutes: string = (date.getUTCMinutes()).toString().padStart(2, '0')
      const seconds: string = (date.getUTCSeconds()).toString().padStart(2, '0')
      const milliseconds: string = (date.getUTCMilliseconds()).toString().padStart(3, '0')

      const formattedTime: string = `${hours}:${minutes}:${seconds}.${milliseconds}`

      return formattedTime
    }
  }
})
</script>

