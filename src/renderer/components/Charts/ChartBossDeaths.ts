import {Component, Prop, Mixins} from 'vue-property-decorator'
import {HorizontalBar} from 'vue-chartjs'

@Component
export default class ChartBossDeaths extends Mixins(HorizontalBar) {
  @Prop({type: Array, required: true}) bossNames!: string[]
  @Prop({type: Array, required: true}) bossDeaths!: number[]
  mounted () {
    this.renderChart({labels: this.bossNames, datasets: [{
      label: '# of deaths',
      data: this.bossDeaths,
      backgroundColor: 'rgb(255, 0, 0)'
    }]},
    {scales: {xAxes: [{ticks: {min: 0}}]}})
  }
}
