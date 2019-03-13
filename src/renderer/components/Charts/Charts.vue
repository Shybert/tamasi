<template>
  <div id="charts">
    <ChartBossDeathsComponent :bossNames="bossNames" :bossDeaths="bossDeaths"></ChartBossDeathsComponent>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'
import {saves} from '../../store/modules/saves'

import ChartBossDeathsComponent from './ChartBossDeaths'

const Super = Vue.extend({
  computed: saves.mapState(['saves'])
})
@Component({components: {ChartBossDeathsComponent}})
export default class Charts extends Super {
  @Prop({type: String, required: true}) gameId!: string
  @Prop({type: String, required: true}) saveId!: string

  get bossNames () {
    return Object.values(this.saves[this.gameId][this.saveId].bosses).map(bossInfo => bossInfo.name)
  }
  get bossDeaths () {
    return Object.values(this.saves[this.gameId][this.saveId].bosses).map(bossInfo => bossInfo.deaths)
  }
}
</script>
