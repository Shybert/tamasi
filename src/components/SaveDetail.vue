<template>
  <section class="save">
    <header>
      <h2 class="saveName">{{ save.name }}</h2>
      <h3 class="gameName">{{ gameName }}</h3>

      <router-link
        class="openOverlayButton"
        to="/overlay"
        v-slot="{ navigate }"
      >
        <BaseButton @click="navigate">Open overlay</BaseButton>
      </router-link>
    </header>

    <BossTable :bosses="save.bosses" class="bossTable" />
  </section>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import BaseButton from '@/components/base/BaseButton.vue'
import BossTable from '@/components/BossTable.vue'

export default defineComponent({
  name: 'SaveDetail',
  components: { BaseButton, BossTable },
  props: {
    save: {
      type: Object,
      required: true,
    },
    gameName: {
      type: String,
      required: true,
    },
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
