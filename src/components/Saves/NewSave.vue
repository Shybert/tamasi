<template>
  <section id="newSave">
    <input id="saveName" v-model="saveName" placeholder="Save Name" required />
    <select v-model="selectedGame">
      <option v-for="game in state.games" :value="game.id" :key="game.id">
        {{ game.name }}
      </option>
    </select>

    <BaseButton @click="localCreateSave" id="createSave">
      Create New Save
    </BaseButton>
  </section>
</template>

<script lang="ts">
import { createComponent, ref } from '@vue/composition-api'
import { useSavesStore, createSave } from '@/store/savesStore'
import BaseButton from '@/components/base/BaseButton.vue'

export default createComponent({
  name: 'NewSave',
  components: { BaseButton },
  setup(props, ctx) {
    const savesStore = useSavesStore()

    const saveName = ref('')
    const selectedGame = ref(savesStore.state.value.games[0].id)

    function localCreateSave(): void {
      createSave(selectedGame.value, saveName.value)
      ctx.emit('createdSave')
    }

    return {
      state: savesStore.state,
      saveName,
      selectedGame,
      localCreateSave
    }
  }
})
</script>
