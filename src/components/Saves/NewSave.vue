<template>
  <section id="newSave">
    <input id="saveName" v-model="saveName" placeholder="Save Name" required />
    <select v-model="selectedGame">
      <option v-for="game in games" :value="game.id" :key="game.id">{{
        game.name
      }}</option>
    </select>

    <BaseButton @click="localCreateSave" id="createSave">
      Create New Save
    </BaseButton>
  </section>
</template>

<script lang="ts">
import { createComponent, ref } from '@vue/composition-api'
import { createSave } from '@/store/savesStore'
import { getGames } from '@/store/gamesData'
import BaseButton from '@/components/base/BaseButton.vue'

export default createComponent({
  name: 'NewSave',
  components: { BaseButton },
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
