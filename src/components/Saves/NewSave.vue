<template>
  <section>
    <BaseLabel>
      <template #label>Save name</template>
      <template #inputElement><BaseInputText v-model="saveName" /></template>
    </BaseLabel>

    <BaseLabel>
      <template #label>Game</template>
      <template #inputElement>
        <BaseSelect v-model="selectedGame" :options="gameOptions" />
      </template>
    </BaseLabel>

    <BaseButton @click="localCreateSave">
      Create New Save
    </BaseButton>
  </section>
</template>

<script lang="ts">
import { createComponent, ref, computed } from '@vue/composition-api'
import { useSavesStore, createSave } from '@/store/savesStore'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseLabel from '@/components/base/BaseLabel.vue'
import BaseInputText from '@/components/base/BaseInputText.vue'
import BaseSelect from '@/components/base/BaseSelect.vue'

export default createComponent({
  name: 'NewSave',
  components: { BaseButton, BaseLabel, BaseInputText, BaseSelect },
  setup(props, ctx) {
    const savesStore = useSavesStore()

    const saveName = ref('')
    const selectedGame = ref(savesStore.state.games[0].id)
    const gameOptions = computed(() =>
      savesStore.state.games.map((game) => {
        return { label: game.name, value: game.id }
      })
    )

    function localCreateSave(): void {
      createSave(selectedGame.value, saveName.value)
      ctx.emit('createdSave')
    }

    return {
      gameOptions,
      saveName,
      selectedGame,
      localCreateSave,
    }
  },
})
</script>
