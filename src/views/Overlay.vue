<template>
  <section id="overlay">
    <h1>Overlay</h1>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { remote } from 'electron'
const { globalShortcut } = remote

@Component
export default class Overlay extends Vue {
  @Prop({ type: String, required: true }) saveId!: string

  mounted() {
    globalShortcut.register('Home', () => {
      this.$router.push({ path: `/` })
    })
  }
  beforeDestroy() {
    globalShortcut.unregisterAll()
  }
}
</script>
