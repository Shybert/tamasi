<template>
  <section>
    <ul class="games">
      <SaveListGame v-for="game in gamesWithSaves" :game="game" :key="game.id">
        <ul class="saves">
          <SaveListSave
            v-for="save in filterSaves(game)"
            :save="save"
            :selectedSaveId="selectedSave"
            @selectSave="selectSave"
            :key="save.id"
          />
        </ul>
      </SaveListGame>
    </ul>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import { useSavesStore, Game, Save } from '@/store/savesStore'
import SaveListGame from '@/components/SaveListGame.vue'
import SaveListSave from '@/components/SaveListSave.vue'

export default defineComponent({
  name: 'SaveList',
  components: { SaveListSave, SaveListGame },
  setup() {
    const savesStore = useSavesStore()

    const gamesWithSaves = computed(() =>
      savesStore.state.games.filter((game) => game.saves.length !== 0)
    )
    function filterSaves(game: Game): Save[] {
      if (!game.collapseSaves) return game.saves
      return game.saves.filter(
        (save) => save.id === savesStore.state.selectedSaveId
      )
    }

    const selectedSave = computed(() => savesStore.state.selectedSaveId)
    function selectSave(saveId: string) {
      savesStore.state.selectedSaveId = saveId
    }

    return {
      gamesWithSaves,
      filterSaves,
      selectedSave,
      selectSave,
    }
  },
})
</script>

<style lang="scss" scoped>
.games {
  padding: 0;
  margin: 0;
  list-style-type: none;
}
.saves {
  padding-left: 0;
  list-style-type: none;
  white-space: nowrap;
}
</style>
