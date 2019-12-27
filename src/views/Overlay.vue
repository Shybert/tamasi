<template>
  <section id="overlay">
    <BossInfo :bossInfo="save.bosses[save.selected]" />
  </section>
</template>

<script lang="ts">
import { createComponent, onUnmounted } from '@vue/composition-api'
import { previousArrayValue, nextArrayValue } from '@/utils/arrayUtils'
import Timer from '@/utils/timer'
// eslint does not properly detect TS interface usage
// eslint-disable-next-line no-unused-vars
import { useSavesStore, ISave } from '../store/savesStore'
import BossInfo from '@/components/BossInfo.vue'
import { remote } from 'electron'
const { globalShortcut } = remote

function previousBoss(save: ISave): void {
  const bossIds = Object.keys(save.bosses)
  save.selected = previousArrayValue(bossIds, bossIds.indexOf(save.selected))
}
function nextBoss(save: ISave): void {
  const bossIds = Object.keys(save.bosses)
  save.selected = nextArrayValue(bossIds, bossIds.indexOf(save.selected))
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
    const savesStore = useSavesStore()
    const saveId: string = ctx.root.$route.params.saveId
    const save = savesStore.state.value.saves[saveId]

    const timer = new Timer()
    timer.on('tick', (time: number) => incrementTime(save, time))

    globalShortcut.register('Home', () => {
      if (!timer.isRunning()) ctx.root.$router.push({ path: `/` })
    })
    globalShortcut.register('PageUp', () => {
      if (!timer.isRunning()) previousBoss(save)
    })
    globalShortcut.register('PageDown', () => {
      if (!timer.isRunning()) nextBoss(save)
    })
    globalShortcut.register('End', () => {
      incrementDeaths(save)
    })
    globalShortcut.register('Insert', () => {
      timer.switch()
    })
    onUnmounted(() => {
      timer.stop()
      globalShortcut.unregisterAll()
    })

    return { saveId, save }
  }
})
</script>
