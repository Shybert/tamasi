<template>
  <section id="overlay">
    <BossInfo :bossInfo="save.bosses[save.selected]" />
  </section>
</template>

<script lang="ts">
import { createComponent, onUnmounted } from '@vue/composition-api'
import { useSavesStore } from '../store/savesStore'
import BossInfo from '@/components/BossInfo.vue'
import { remote } from 'electron'
const { globalShortcut } = remote

export default createComponent({
  name: 'Overlay',
  components: { BossInfo },
  setup(props, ctx) {
    const savesStore = useSavesStore()
    const saveId: string = ctx.root.$route.params.saveId
    const save = savesStore.state.value.saves[saveId]

    globalShortcut.register('Home', () => {
      ctx.root.$router.push({ path: `/` })
    })
    onUnmounted(() => globalShortcut.unregisterAll())

    return { saveId, save }
  }
})
</script>
