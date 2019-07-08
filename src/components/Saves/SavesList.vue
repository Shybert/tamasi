<template>
  <ul>
    <li v-for="(save, saveId) in savesList" :key="saveId">
      <ul>
        <li>{{ save.name }}</li>
        <li>
          <router-link :to="`/overlay/${gameId}/${saveId}`"
            >Overlay</router-link
          >
        </li>
        <li>
          <router-link :to="`/charts/${gameId}/${saveId}`">Charts</router-link>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { saves } from '@/store/modules/savesStore'

const Super = Vue.extend({
  computed: saves.mapState(['saves'])
})
@Component
export default class SavesList extends Super {
  @Prop({ type: String, required: true }) gameId!: string

  get savesList() {
    return this.saves[this.gameId]
  }
}
</script>
