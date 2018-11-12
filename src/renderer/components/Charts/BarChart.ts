import {Component, Prop, Mixins} from 'vue-property-decorator'
import {HorizontalBar} from 'vue-chartjs'
import {ChartData} from 'chart.js'

@Component
export default class BarChart extends Mixins(HorizontalBar) {
  @Prop(Object) chartData!: ChartData
  mounted () {
    this.renderChart(this.chartData)
  }
}
