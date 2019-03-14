import {Component, Prop, Mixins} from 'vue-property-decorator'
import {HorizontalBar} from 'vue-chartjs'
import formatBossTime from '../../utils/formatBossTime'

@Component
export default class ChartBossTimes extends Mixins(HorizontalBar) {
  @Prop({type: Array, required: true}) bossNames!: string[]
  @Prop({type: Array, required: true}) bossTimes!: number[]
  mounted () {
    this.renderChart({labels: this.bossNames, datasets: [{
      label: 'Boss time in hh:mm:ss',
      data: this.bossTimes,
      backgroundColor: 'rgb(0, 255, 0)'
    }]}, {
      tooltips: {
        callbacks: {
          label: toolTipItem => {
            if (!toolTipItem.xLabel) return ''
            return formatBossTime(Number.parseInt(toolTipItem.xLabel, 10), false)
          }
        }
      },
      scales: {xAxes: [{
        ticks: {
          min: 0,
          callback: value => {
            return formatBossTime(Number.parseInt(value, 10), false)
          }
        }
      }]}
    })
  }
}
