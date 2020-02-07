<template>
  <section id="saveInfo">
    <div v-if="!selectedSave">No save selected!</div>

    <div v-else>
      <h2 id="saveName">{{ selectedSave.name }}</h2>
      <div id="gameName">{{ currentGame.name }}</div>
      <router-link id="openOverlay" to="/overlay" v-slot="{ navigate }">
        <BaseButton @click="navigate">Open overlay</BaseButton>
      </router-link>
    </div>
  </section>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
import { currentGame, selectedSave } from '@/store/savesStore'
import BaseButton from '@/components/base/BaseButton.vue'

export default createComponent({
  name: 'SaveInfo',
  components: { BaseButton },
  setup() {
    return { currentGame, selectedSave }
  }
})
</script>

<style lang="scss" scoped>
#saveName,
#gameName {
  text-align: center;
}
#saveName {
  margin-bottom: 0;
}
#gameName {
  color: $mediumEmphasisText;
  font-style: italic;
  font-size: 75%;
}
#openOverlay {
  margin-top: 0.5em;
}
</style>
