<template>
  <div id="charts">
    <HorizontalBarChartComponent :chartData="deathsChartData(gameId, saveId).chartData" :chartOptions="deathsChartData(gameId, saveId).chartOptions"></HorizontalBarChartComponent>

    <HorizontalBarChartComponent :chartData="timesChartData(gameId, saveId).chartData" :chartOptions="timesChartData(gameId, saveId).chartOptions"></HorizontalBarChartComponent>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'
import {saves} from '../../store/modules/saves'

import HorizontalBarChartComponent from './HorizontalBarChart'

const Super = Vue.extend({
  computed: saves.mapGetters(['deathsChartData', 'timesChartData'])
})
@Component({components: {HorizontalBarChartComponent}})
export default class Charts extends Super {
  @Prop({type: String, required: true}) gameId!: string
  @Prop({type: String, required: true}) saveId!: string
}
</script>
