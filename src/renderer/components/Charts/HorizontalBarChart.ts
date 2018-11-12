import {Component, Prop, Mixins} from 'vue-property-decorator'
import {HorizontalBar} from 'vue-chartjs'
import {ChartData, ChartOptions} from 'chart.js'

@Component
export default class BarChart extends Mixins(HorizontalBar) {
  @Prop(Object) chartData!: ChartData
  @Prop(Object) chartOptions!: ChartOptions
  mounted () {
    this.renderChart(this.chartData, this.chartOptions)
  }
}
