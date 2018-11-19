<template>
  <section id="selectedBossInfo">
    <h2 class="bossName">{{bossInfo.name}}</h2>

    <div class="bossTime">{{formattedTime}}</div>

    <div class="bossDeaths">{{bossInfo.deaths}} deaths</div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'
import {ISaveBossInfo} from '../../store/savesData'
import formatBossTime from '../../utils/formatBossTime'

@Component
export default class SelectedBossInfo extends Vue {
  @Prop({type: Object, required: true}) bossInfo!: ISaveBossInfo

  get formattedTime (): string {
    return formatBossTime(this.bossInfo.time, this.$store.getters.settingValue('overlay', 'showBossTimeMilliseconds'))
  }
}
</script>
