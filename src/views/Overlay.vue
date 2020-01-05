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
import BossInfo from '@/components/BossInfo.vue'
import { remote } from 'electron'
const { globalShortcut } = remote

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
    // There will always be a selected save in the overlay.
    const save = selectedSave as Ref<ISave>

    const timer = new Timer()
    timer.on('tick', (time: number) => incrementTime(save.value, time))

    globalShortcut.register('Home', () => {
      if (!timer.isRunning()) ctx.root.$router.push({ path: `/` })
    })
    globalShortcut.register('PageUp', () => {
      if (!timer.isRunning()) previousBoss(save.value)
    })
    globalShortcut.register('PageDown', () => {
      if (!timer.isRunning()) nextBoss(save.value)
    })
    globalShortcut.register('End', () => {
      incrementDeaths(save.value)
    })
    globalShortcut.register('Insert', () => {
      timer.switch()
    })
    onUnmounted(() => {
      timer.stop()
      globalShortcut.unregisterAll()
    })

    return { save }
  }
})
</script>
