<template>
  <section id="overlay">
    <BossDetail :boss="save.bosses[save.selected]" />
  </section>
</template>

<script lang="ts">
import { defineComponent, onUnmounted, Ref } from '@vue/composition-api'
import { previousArrayIndex, nextArrayIndex } from '@/utils/arrayUtils'
import Timer from '@/utils/timer'
import { selectedSave, Save } from '../store/savesStore'
import BossDetail from '@/components/BossDetail.vue'
import { ipcRenderer } from 'electron'

function removeListeners() {
  const channels = [
    'home',
    'previousBoss',
    'nextBoss',
    'incrementDeaths',
    'toggleTimer',
  ]
  channels.forEach((channel) => ipcRenderer.removeAllListeners(channel))
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

function previousBoss(save: Save): void {
  save.selected = previousArrayIndex(save.bosses, save.selected)
}
function nextBoss(save: Save): void {
  save.selected = nextArrayIndex(save.bosses, save.selected)
}
function incrementDeaths(save: Save): void {
  save.bosses[save.selected].deaths += 1
}
function incrementTime(save: Save, time: number): void {
  save.bosses[save.selected].time += time
}

export default defineComponent({
  name: 'Overlay',
  components: { BossDetail },
  setup(props, ctx) {
    initializeOverlay()

    // There will always be a selected save in the overlay.
    const save = selectedSave as Ref<Save>

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
  },
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
