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

    <SaveDetail
      v-if="selectedSave"
      :save="selectedSave"
      :gameName="currentGame.name"
      class="save"
    />
    <section v-else class="save">No save selected!</section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import { currentGame, selectedSave } from '@/store/savesStore'
import BaseButton from '@/components/base/BaseButton.vue'
import Modal from '@/components/Modal.vue'
import SaveCreate from '@/components/Saves/SaveCreate.vue'
import SaveList from '@/components/Saves/SaveList.vue'
import SaveDetail from '@/components/Saves/SaveDetail.vue'

export default defineComponent({
  name: 'Home',
  components: { BaseButton, Modal, SaveCreate, SaveList, SaveDetail },
  setup() {
    const showNewSaveModal = ref(false)
    return { showNewSaveModal, currentGame, selectedSave }
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
