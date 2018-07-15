<template>
  <div id="overlay">
    <ul>
      <li v-for="(boss, bossId) in saveInfo.bosses" :key="bossId" :id="bossId" :class="{selected: (bossId === saveInfo.selected)}" @click="selectBoss(bossId)">
        <BossInfoComponent :bossInfo="boss"></BossInfoComponent>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {remote} from 'electron'
import {throttle} from 'lodash'
import {Timer} from '../../timer'
import {Save, SaveInfo} from '../../storage/saves'

import BossInfoComponent from './BossInfo.vue'

function previousArrayValue (array: any[], index: number): any {
  if (index === 0) index = array.length
  index -= 1
  return array[index]
}
function nextArrayValue (array: any[], index: number): any {
  index += 1
  index = index % array.length
  return array[index]
}

export default Vue.extend({
  data () {
    return {
      save: new Save(this.$route.params.gameId, this.$route.params.saveId),
      saveInfo: {} as SaveInfo,
      timer: new Timer()
    }
  },
  watch: {
    saveInfo: {
      handler: throttle(function (this: any, newInfo: SaveInfo) {
        this.save.setSaveInfo(newInfo)
      }, 5000),
      deep: true
    }
  },
  created () {
    this.saveInfo = this.save.getSaveInfo()

    // Check if selected boss is valid
    const bossIds = Object.keys(this.saveInfo.bosses)
    if (!bossIds.includes(this.saveInfo.selected)) this.selectBoss(bossIds[0])

    remote.globalShortcut.register('PageUp', () => {
      this.selectBoss(previousArrayValue(bossIds, bossIds.indexOf(this.saveInfo.selected)))
    })
    remote.globalShortcut.register('PageDown', () => {
      this.selectBoss(nextArrayValue(bossIds, bossIds.indexOf(this.saveInfo.selected)))
    })
    remote.globalShortcut.register('End', () => {
      this.incrementDeaths(this.saveInfo.selected)
    })
    remote.globalShortcut.register('Home', () => {
      this.timer.switch(this.saveInfo, this.saveInfo.selected)
    })
  },
  methods: {
    selectBoss (bossId: string): void {
      // Stop the timer if it is running
      this.timer.stop()

      this.saveInfo.selected = bossId
      console.log(this.saveInfo.selected)
    },
    incrementDeaths (bossId: string): void {
      this.saveInfo.bosses[bossId].deaths += 1
    }
  },
  components: {BossInfoComponent}
})
</script>

<style>
.selected {
  background-color: gray;
}
</style>
