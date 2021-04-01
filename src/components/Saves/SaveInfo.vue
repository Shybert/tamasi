<template>
  <section>
    <div v-if="!selectedSave">No save selected!</div>

    <div v-else class="save">
      <header>
        <h2 class="saveName">{{ selectedSave.name }}</h2>
        <h3 class="gameName">{{ currentGame.name }}</h3>

        <router-link
          class="openOverlayButton"
          to="/overlay"
          v-slot="{ navigate }"
        >
          <BaseButton @click="navigate">Open overlay</BaseButton>
        </router-link>
      </header>

      <BossTable :bosses="selectedSave.bosses" class="bossTable" />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { currentGame, selectedSave } from '@/store/savesStore'
import BaseButton from '@/components/base/BaseButton.vue'
import BossTable from '@/components/Saves/BossTable.vue'

export default defineComponent({
  name: 'SaveInfo',
  components: { BaseButton, BossTable },
  setup() {
    return { currentGame, selectedSave }
  },
})
</script>

<style lang="scss" scoped>
.save {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
}

.saveName,
.gameName {
  text-align: center;
  margin: 0;
}
.gameName {
  color: $mediumEmphasisText;
  font-style: italic;
  font-size: 75%;
  font-weight: normal;
}

.openOverlayButton {
  margin-top: 0.5em;
}

.bossTable {
  display: block;
}
</style>
