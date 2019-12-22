<template>
  <div>
    <h2>Create new save</h2>

    <input id="saveName" v-model="saveName" placeholder="Save Name" required />
    <select v-model="selectedGame">
      <option v-for="game in games" :value="game.id" :key="game.id">{{
        game.name
      }}</option>
    </select>
    <button @click="localCreateSave" id="createSave">Create New Save</button>

    <button @click="$emit('close')" id="closeOverlay">Close Overlay</button>
  </div>
</template>

<script lang="ts">
import { createComponent, ref } from '@vue/composition-api'
import { createSave } from '@/store/savesStore'
import { getGames } from '@/store/gamesData'

export default createComponent({
  name: 'SavesList',
  setup(props, ctx) {
    const games = getGames()

    const saveName = ref('')
    const selectedGame = ref(games[0].id)

    function localCreateSave(): void {
      createSave(selectedGame.value, saveName.value)
      ctx.emit('close')
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
