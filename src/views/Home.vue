<template>
  <div id="home">
    <section id="saves">
      <Modal v-if="showNewSaveModal" @closeModal="showNewSaveModal = false">
        <template v-slot:title>New Save</template>
        <template v-slot:main>
          <NewSave @createdSave="showNewSaveModal = false" />
        </template>
      </Modal>

      <SavesList />

      <BaseButton @click="showNewSaveModal = true">+ New Save</BaseButton>
    </section>

    <section id="saveInfo"></section>
  </div>
</template>

<script lang="ts">
import { createComponent, ref } from '@vue/composition-api'
import BaseButton from '@/components/base/BaseButton.vue'
import Modal from '@/components/Modal.vue'
import NewSave from '@/components/Saves/NewSave.vue'
import SavesList from '@/components/Saves/SavesList.vue'

export default createComponent({
  name: 'Home',
  components: { BaseButton, Modal, NewSave, SavesList },
  setup() {
    const showNewSaveModal = ref(false)
    return { showNewSaveModal }
  }
})
</script>

<style lang="scss" scoped>
#home {
  display: flex;
}
#saves {
  width: 40%;
}
#saveInfo {
  width: 60%;
}

button {
  width: 100%;
}
</style>
