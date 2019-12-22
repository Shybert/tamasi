<template>
  <section class="saves">
    <NewSaveOverlay
      v-if="showNewSaveOverlay"
      @close="showNewSaveOverlay = false"
    />
    <button @click="showNewSaveOverlay = true" id="openNewSaveOverlay">
      Open New Save Overlay
    </button>

    <SavesList />
  </section>
</template>

<script lang="ts">
import { createComponent, ref } from '@vue/composition-api'
import NewSaveOverlay from '@/components/Saves/NewSaveOverlay.vue'
import SavesList from '@/components/Saves/SavesList.vue'

export default createComponent({
  name: 'Saves',
  components: { NewSaveOverlay, SavesList },
  setup() {
    const showNewSaveOverlay = ref(true)
    return { showNewSaveOverlay }
  }
})
</script>
