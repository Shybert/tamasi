<template>
  <div id="charts">
    <HorizontalBarChartComponent :chartData="deathsChartData.chartData" :chartOptions="deathsChartData.chartOptions"></HorizontalBarChartComponent>

    <HorizontalBarChartComponent :chartData="timesChartData.chartData" :chartOptions="timesChartData.chartOptions"></HorizontalBarChartComponent>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'
import {ChartData, ChartOptions} from 'chart.js'

import HorizontalBarChartComponent from './HorizontalBarChart'

@Component({components: {HorizontalBarChartComponent}})
export default class Charts extends Vue {
  @Prop(String) gameId!: string
  @Prop(String) saveId!: string

  get deathsChartData (): {chartData: ChartData, chartOptions: ChartOptions} {
    return this.$store.getters.deathsChartData(this.gameId, this.saveId)
  }
  get timesChartData (): {chartData: ChartData, chartOptions: ChartOptions} {
    return this.$store.getters.timesChartData(this.gameId, this.saveId)
  }
}
</script>
