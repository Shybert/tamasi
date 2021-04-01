<template>
  <div id="home">
    <section class="saves scroller">
      <Modal :show="showNewSaveModal" @closeModal="showNewSaveModal = false">
        <template #title>New Save</template>
        <template #main>
          <SaveCreate @createdSave="showNewSaveModal = false" />
        </template>
      </Modal>

      <SaveList class="saveList" />

      <BaseButton class="newSaveButton" @click="showNewSaveModal = true">
        New Save
      </BaseButton>
    </section>

    <section class="save">
      <SaveInfo />
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import BaseButton from '@/components/base/BaseButton.vue'
import Modal from '@/components/Modal.vue'
import SaveCreate from '@/components/Saves/SaveCreate.vue'
import SaveList from '@/components/Saves/SaveList.vue'
import SaveInfo from '@/components/Saves/SaveInfo.vue'

export default defineComponent({
  name: 'Home',
  components: { BaseButton, Modal, SaveCreate, SaveList, SaveInfo },
  setup() {
    const showNewSaveModal = ref(false)
    return { showNewSaveModal }
  },
})
</script>

<style lang="scss" scoped>
@import '@/styles/scroller';

#home {
  display: flex;
  height: 100%;
}

.saves {
  background-color: $gray500;
  width: 30%;
  max-width: 17em;
}
.saveList {
  padding: 0.5em;
}
.newSaveButton {
  width: 90%;
  position: sticky;
  bottom: 1em;
  margin-bottom: 1em;
}

.save {
  padding: 1em;
  flex-grow: 1;
  overflow: auto;
}
</style>
