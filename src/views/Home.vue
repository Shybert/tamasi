<template>
  <section id="home">
    <Modal v-if="showNewSaveModal" @closeModal="showNewSaveModal = false">
      <template slot="title">New Save</template>
      <template slot="main"><NewSave @createdSave="showNewSaveModal = false" /></template>
    </Modal>

    <SavesList @newSave="showNewSaveModal = true" />
  </section>
</template>

<script lang="ts">
import { createComponent, ref } from '@vue/composition-api'
import Modal from '@/components/Modal.vue'
import NewSave from '@/components/Saves/NewSave.vue'
import SavesList from '@/components/Saves/SavesList.vue'

export default createComponent({
  name: 'Home',
  components: { Modal, NewSave, SavesList },
  setup() {
    const showNewSaveModal = ref(false)
    return { showNewSaveModal }
  }
})
</script>
