<template>
  <div id="overlay">
    <div id="bossList" v-if="showBossList">
      <ul>
        <li v-for="(boss, bossId) in save.bosses" :key="bossId" :id="bossId" :class="{selected: (bossId === save.selected)}" @click="selectBoss(bossId)">
          <BossInfoComponent :bossInfo="boss"></BossInfoComponent>
        </li>
      </ul>      
    </div>

    <SelectedBossInfoComponent :bossInfo="save.bosses[save.selected]"></SelectedBossInfoComponent>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'
import {remote, ipcRenderer} from 'electron'
import Timer from '../../utils/timer'
import {ISave} from '../../store/savesData'

import BossInfoComponent from './BossInfo.vue'
import SelectedBossInfoComponent from './SelectedBossInfo.vue'

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

@Component({components: {BossInfoComponent, SelectedBossInfoComponent}})
export default class Overlay extends Vue {
  @Prop({type: String, required: true}) gameId!: string
  @Prop({type: String, required: true}) saveId!: string

  get save (): ISave {
    return this.$store.state.saves.saves[this.gameId][this.saveId]
  }
  get previousBossKeybind () {
    return this.$store.getters.settingValue('keybinds', 'previousBoss')
  }
  get nextBossKeybind () {
    return this.$store.getters.settingValue('keybinds', 'nextBoss')
  }
  get incrementDeathCounterKeybind () {
    return this.$store.getters.settingValue('keybinds', 'incrementDeaths')
  }
  get switchTimerKeybind () {
    return this.$store.getters.settingValue('keybinds', 'switchTimer')
  }
  get hideShowOverlayKeybind () {
    return this.$store.getters.settingValue('keybinds', 'hideShowOverlay')
  }
  get hideShowBossListOnOverlayKeybind () {
    return this.$store.getters.settingValue('keybinds', 'hideShowBossListOnOverlay')
  }

  timer = new Timer()
  showBossList: boolean = true

  created () {
    this.timer.on('tick', this.setBossTime)

    const bossIds = Object.keys(this.save.bosses)
    // Check if selected boss is valid
    if (!bossIds.includes(this.save.selected)) this.selectBoss(bossIds[0])

    // Unregister keybinds incase they haven't been unregistered from a window close
    remote.globalShortcut.unregisterAll()
    remote.globalShortcut.register(this.previousBossKeybind, () => {
      this.selectBoss(previousArrayValue(bossIds, bossIds.indexOf(this.save.selected)))
    })
    remote.globalShortcut.register(this.nextBossKeybind, () => {
      this.selectBoss(nextArrayValue(bossIds, bossIds.indexOf(this.save.selected)))
    })
    remote.globalShortcut.register(this.incrementDeathCounterKeybind, () => {
      this.incrementDeaths(this.save.selected)
    })
    remote.globalShortcut.register(this.switchTimerKeybind, () => {
      this.timer.switch(this.save.bosses[this.save.selected].time)
    })
    remote.globalShortcut.register(this.hideShowOverlayKeybind, () => ipcRenderer.send('hideShowOverlay'))
    remote.globalShortcut.register(this.hideShowBossListOnOverlayKeybind, () => this.showBossList = !this.showBossList)
  }

  selectBoss (bossId: string): void {
    // Stop the timer if it is running
    this.timer.stop()

    this.$store.commit('setSelectedBoss', {gameId: this.gameId,
      saveId: this.saveId,
      selectedBossId: bossId})
    console.log(this.save.selected)
  }

  incrementDeaths (bossId: string): void {
    this.$store.commit('incrementDeaths', {gameId: this.gameId,
      saveId: this.saveId,
      bossId})
  }

  setBossTime (time: number): void {
    this.$store.commit('setBossTime', {gameId: this.gameId,
    saveId: this.saveId,
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
