<template>
  <ul>
    <li id="bossName">Name: {{bossInfo.name}}</li>
    <li id="bossTime">Time: {{formattedTime}}</li>
    <li id="bossDeaths">Deaths: {{bossInfo.deaths}}</li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'
import {ISaveBossInfo} from '../../store/modules/saves'
import formatBossTime from '../../utils/formatBossTime'

@Component
export default class BossInfo extends Vue {
  @Prop(Object) bossInfo!: ISaveBossInfo

  get formattedTime () {
    return formatBossTime(this.bossInfo.time, this.$store.getters.settingValue('overlay', 'showBossTimeMilliseconds'))
  }
}
</script>
