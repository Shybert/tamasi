<template>
  <section id="savesList">
    <ul>
      <li v-for="(game, index) in gamesWithSaves" :key="game.id">
        {{ game.shortName ? game.shortName : game.name }}
        <ul>
          <li
            v-for="save in gamesWithSaves[index].saves"
            @click="selectSave(save.id)"
            :key="save.id"
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
import { useSavesStore } from '@/store/savesStore'

export default createComponent({
  name: 'SavesList',
  setup(props, ctx) {
    const savesStore = useSavesStore()
    const gamesWithSaves = computed(() =>
      savesStore.state.games.filter(game => game.saves.length !== 0)
    )

    function selectSave(saveId: string): void {
      savesStore.state.selectedSaveId = saveId
      ctx.root.$router.push({ path: '/overlay' })
    }

    return {
      gamesWithSaves,
      selectSave
    }
  }
})
</script>
