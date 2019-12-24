<template>
  <section id="overlay">
    <h1>Overlay</h1>
  </section>
</template>

<script lang="ts">
import { createComponent, onUnmounted } from '@vue/composition-api'
import { remote } from 'electron'
const { globalShortcut } = remote

export default createComponent({
  name: 'Overlay',
  setup(props, ctx) {
    globalShortcut.register('Home', () => {
      ctx.root.$router.push({ path: `/` })
    })
    onUnmounted(() => globalShortcut.unregisterAll())
  }
})
</script>
