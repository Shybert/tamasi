<template>
  <section id="overlay">
    <h1>Overlay</h1>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component
export default class Overlay extends Vue {
  @Prop({ type: String, required: true }) gameId!: string
  @Prop({ type: String, required: true }) saveId!: string
}
</script>
