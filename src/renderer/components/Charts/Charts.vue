<template>
  <div id="charts">
    <h1>test</h1>
    <BarChartComponent :chartData="deathsChartData"></BarChartComponent>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import {ChartData} from 'chart.js'

import BarChartComponent from './BarChart'

@Component({components: {BarChartComponent}})
export default class Charts extends Vue {
  get deathsChartData (): ChartData {
    return this.$store.getters.deathsChartData(this.$route.params.gameId, this.$route.params.saveId)
  }
}
</script>
