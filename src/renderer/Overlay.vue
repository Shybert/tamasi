<template>
  <div id="overlay">
    <ul>
      <li v-for="(boss, bossId) in save.bosses" :key="bossId" :id="bossId" :class="{selected: (bossId === save.selected)}" @click="selectBoss(bossId)">
        <BossInfoComponent :bossInfo="boss"></BossInfoComponent>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import {remote} from 'electron'
import Timer from './utils/timer'
import {ISave} from './store/modules/saves'

import BossInfoComponent from './components/Overlay/BossInfo.vue'

function previousArrayValue (array: string[], index: number): any {
  if (index === 0) index = array.length
  index -= 1
  return array[index]
}
function nextArrayValue (array: string[], index: number): any {
  index += 1
  index = index % array.length
  return array[index]
}

@Component({components: {BossInfoComponent}})
export default class Overlay extends Vue {
  get save (): ISave {
    return this.$store.state.saves.saves[this.$route.params.gameId][this.$route.params.saveId]
  }
  get previousBossHotkey () {
    return this.$store.getters.getSetting('hotkeys', 'previousBoss')
  }
  get nextBossHotkey () {
    return this.$store.getters.getSetting('hotkeys', 'nextBoss')
  }
  get incrementDeathCounterHotkey () {
    return this.$store.getters.getSetting('hotkeys', 'incrementDeaths')
  }
  get switchTimerHotkey () {
    return this.$store.getters.getSetting('hotkeys', 'switchTimer')
  }

  timer = new Timer()

  created () {
    this.timer.on('tick', this.setBossTime)

    const bossIds = Object.keys(this.save.bosses)
    // Check if selected boss is valid
    if (!bossIds.includes(this.save.selected)) this.selectBoss(bossIds[0])

    // Unregister hotkeys incase they haven't been unregistered from a window close
    remote.globalShortcut.unregisterAll()
    remote.globalShortcut.register(this.previousBossHotkey, () => {
      this.selectBoss(previousArrayValue(bossIds, bossIds.indexOf(this.save.selected)))
    })
    remote.globalShortcut.register(this.nextBossHotkey, () => {
      this.selectBoss(nextArrayValue(bossIds, bossIds.indexOf(this.save.selected)))
    })
    remote.globalShortcut.register(this.incrementDeathCounterHotkey, () => {
      this.incrementDeaths(this.save.selected)
    })
    remote.globalShortcut.register(this.switchTimerHotkey, () => {
      this.timer.switch(this.save.bosses[this.save.selected].time)
    })
  }

  selectBoss (bossId: string): void {
    // Stop the timer if it is running
    this.timer.stop()

    this.$store.commit('setSelectedBoss', {gameId: this.$route.params.gameId,
      saveId: this.$route.params.saveId,
      selectedBossId: bossId})
    console.log(this.save.selected)
  }

  incrementDeaths (bossId: string): void {
    this.$store.commit('incrementDeaths', {gameId: this.$route.params.gameId,
      saveId: this.$route.params.saveId,
      bossId})
  }

  setBossTime (time: number): void {
    this.$store.commit('setBossTime', {gameId: this.$route.params.gameId,
    saveId: this.$route.params.saveId,
    bossId: this.save.selected,
    time})
  }
}
</script>

<style>
.selected {
  background-color: gray;
}
</style>
