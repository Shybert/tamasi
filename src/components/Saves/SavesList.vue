<template>
  <ul>
    <li v-for="(save, saveId) in saves" :key="saveId">
      <ul>
        <li>Name: {{ save.name }}</li>
        <li>Game: {{ save.gameId }}</li>
        <!-- <li>
          <router-link :to="`/overlay/${saveId}`">Overlay</router-link>
        </li> -->
      </ul>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { saves } from '@/store/modules/savesStore'

const Super = Vue.extend({
  computed: saves.mapState(['saves'])
})
@Component
export default class SavesList extends Super {}
</script>
