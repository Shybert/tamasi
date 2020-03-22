<template>
  <section id="overlay">
    <BossInfo :bossInfo="save.bosses[save.selected]" />
  </section>
</template>

<script lang="ts">
// eslint does not properly detect TS interface usage
// eslint-disable-next-line no-unused-vars
import { createComponent, onUnmounted, Ref } from '@vue/composition-api'
import { previousArrayIndex, nextArrayIndex } from '@/utils/arrayUtils'
import Timer from '@/utils/timer'
// eslint-disable-next-line no-unused-vars
import { selectedSave, ISave } from '../store/savesStore'
import BossInfo from '@/components/Overlay/BossInfo.vue'
import { ipcRenderer } from 'electron'

function removeListeners() {
  const channels = [
    'home',
    'previousBoss',
    'nextBoss',
    'incrementDeaths',
    'toggleTimer'
  ]
  channels.forEach(channel => ipcRenderer.removeAllListeners(channel))
}
function initializeOverlay() {
  // Remove listeners in case they weren't properly removed
  removeListeners()
  ipcRenderer.send('initializeOverlay')
}
function closeOverlay() {
  removeListeners()
  ipcRenderer.send('closeOverlay')
}

function previousBoss(save: ISave): void {
  save.selected = previousArrayIndex(save.bosses, save.selected)
}
function nextBoss(save: ISave): void {
  save.selected = nextArrayIndex(save.bosses, save.selected)
}
function incrementDeaths(save: ISave): void {
  save.bosses[save.selected].deaths += 1
}
function incrementTime(save: ISave, time: number): void {
  save.bosses[save.selected].time += time
}

export default createComponent({
  name: 'Overlay',
  components: { BossInfo },
  setup(props, ctx) {
    initializeOverlay()

    // There will always be a selected save in the overlay.
    const save = selectedSave as Ref<ISave>

    const timer = new Timer()
    timer.on('tick', (time: number) => incrementTime(save.value, time))

    ipcRenderer.on('home', () => {
      if (!timer.isRunning()) ctx.root.$router.push({ path: `/` })
    })
    ipcRenderer.on('previousBoss', () => {
      if (!timer.isRunning()) previousBoss(save.value)
    })
    ipcRenderer.on('nextBoss', () => {
      if (!timer.isRunning()) nextBoss(save.value)
    })
    ipcRenderer.on('incrementDeaths', () => {
      incrementDeaths(save.value)
    })
    ipcRenderer.on('toggleTimer', () => {
      timer.toggle()
    })
    onUnmounted(() => {
      timer.stop()
      closeOverlay()
    })

    return { save }
  }
})
</script>

<style lang="scss" scoped>
#overlay {
  -webkit-app-region: drag;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
}
</style>
