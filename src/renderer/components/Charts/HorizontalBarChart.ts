import {Component, Prop, Mixins} from 'vue-property-decorator'
import {HorizontalBar} from 'vue-chartjs'
import {ChartData, ChartOptions} from 'chart.js'

@Component
export default class BarChart extends Mixins(HorizontalBar) {
  @Prop({type: Object, required: true}) chartData!: ChartData
  @Prop({type: Object, required: true}) chartOptions!: ChartOptions
  mounted () {
    this.renderChart(this.chartData, this.chartOptions)
  }
}
