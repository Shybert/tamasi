<template>
  <ul>
    <li style="display: none">{{ state.forceRerender }}s</li>
    <li v-for="(save, saveId) in state.saves" :key="saveId">
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
import { createComponent } from '@vue/composition-api'
import { useSavesStore } from '@/store/savesStore'

export default createComponent({
  name: 'SavesList',
  setup() {
    const savesStore = useSavesStore()
    return {
      state: savesStore.state
    }
  }
})
</script>
