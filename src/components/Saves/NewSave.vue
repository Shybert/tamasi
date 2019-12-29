<template>
  <section id="newSave">
    <input id="saveName" v-model="saveName" placeholder="Save Name" required />
    <select v-model="selectedGame">
      <option v-for="game in games" :value="game.id" :key="game.id">{{
        game.name
      }}</option>
    </select>
    <button @click="localCreateSave" id="createSave">Create New Save</button>
  </section>
</template>

<script lang="ts">
import { createComponent, ref } from '@vue/composition-api'
import { createSave } from '@/store/savesStore'
import { getGames } from '@/store/gamesData'

export default createComponent({
  name: 'NewSave',
  setup(props, ctx) {
    const games = getGames()

    const saveName = ref('')
    const selectedGame = ref(games[0].id)

    function localCreateSave(): void {
      createSave(selectedGame.value, saveName.value)
      ctx.emit('createdSave')
    }

    return {
      games,
      saveName,
      selectedGame,
      localCreateSave
    }
  }
})
</script>
