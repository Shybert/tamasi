<template>
  <section class="saves">
    <NewSave v-if="showNewSaveOverlay" @close="showNewSaveOverlay = false" />
    <button @click="showNewSaveOverlay = true" id="openNewSaveOverlay">
      Open New Save Overlay
    </button>

    <SavesList />
  </section>
</template>

<script lang="ts">
import { createComponent, ref } from '@vue/composition-api'
import NewSave from '@/components/Saves/NewSave.vue'
import SavesList from '@/components/Saves/SavesList.vue'

export default createComponent({
  name: 'Home',
  components: { NewSave, SavesList },
  setup() {
    const showNewSaveOverlay = ref(true)
    return { showNewSaveOverlay }
  }
})
</script>
