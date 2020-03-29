<template>
  <section>
    <ul class="games">
      <li v-for="game in gamesWithSaves" :key="game.id">
        <div
          class="gameName"
          @click="game.collapseSaves = !game.collapseSaves"
          :title="game.name"
        >
          <IconAngle
            name="Collapse/Expand"
            :transform="game.collapseSaves ? 'rotate(-90)' : ''"
          />
          {{ game.shortName ? game.shortName : game.name }}
        </div>

        <ul class="saves">
          <li
            v-for="save in filterSaves(game)"
            :key="save.id"
            class="save"
            :class="{ selected: save.id == selectedSave }"
            @click="selectSave(save.id)"
            :title="save.name"
          >
            {{ save.name }}
          </li>
        </ul>
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import { createComponent, computed } from '@vue/composition-api'
// eslint does not properly detect TS interface usage
// eslint-disable-next-line no-unused-vars
import { useSavesStore, Game, Save } from '@/store/savesStore'
import { IconAngle } from '@/components/icons/icons'

export default createComponent({
  name: 'SavesList',
  components: { IconAngle },
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
    function selectSave(saveId: string): void {
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
.games > li {
  margin-bottom: 0.5em;
}
.gameName {
  color: $mediumEmphasisText;
  cursor: pointer;
}
.gameName:hover {
  color: $highEmphasisText;
}

.saves {
  padding-left: 0;
  list-style-type: none;
  white-space: nowrap;
}
.save {
  overflow: hidden;
  text-overflow: ellipsis;
  color: $mediumEmphasisText;
  margin: 0.3em 0.25em;
  padding: 0.3em 0.5em;
  border-radius: 4px;
  cursor: pointer;
}
.save:hover {
  background-color: $gray300;
  color: $highEmphasisText;
}
.selected,
.selected:hover {
  cursor: default;
  background-color: $primaryColor500;
  color: $highEmphasisText;
}
</style>
