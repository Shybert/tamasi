<template>
  <div id="home">
    <section id="saves">
      <Modal :show="showNewSaveModal" @closeModal="showNewSaveModal = false">
        <template #title>New Save</template>
        <template #main>
          <NewSave @createdSave="showNewSaveModal = false" />
        </template>
      </Modal>

      <SavesList />

      <BaseButton id="newSaveButton" @click="showNewSaveModal = true">
        + New Save
      </BaseButton>
    </section>

    <section id="save">
      <SaveInfo />
    </section>
  </div>
</template>

<script lang="ts">
import { createComponent, ref } from '@vue/composition-api'
import BaseButton from '@/components/base/BaseButton.vue'
import Modal from '@/components/Modal.vue'
import NewSave from '@/components/Saves/NewSave.vue'
import SavesList from '@/components/Saves/SavesList.vue'
import SaveInfo from '@/components/Saves/SaveInfo.vue'

export default createComponent({
  name: 'Home',
  components: { BaseButton, Modal, NewSave, SavesList, SaveInfo },
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
#newSaveButton {
  position: sticky;
  bottom: 0;
  width: 100%;
}
#save {
  width: 60%;
}
</style>
