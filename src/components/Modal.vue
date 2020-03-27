<template>
  <transition name="modal">
    <div v-if="show" class="modalContainer" @click.self="$emit('closeModal')">
      <section class="modalContent">
        <IconX
          name="Close modal"
          role="button"
          width="20"
          height="20"
          strokeWidth="4"
          class="closeModalButton"
          @click.native="$emit('closeModal')"
        />

        <h2 class="modalTitle">
          <slot name="title">Why didn't you pass a title?</slot>
        </h2>
        <div class="modalMain">
          <slot name="main">There should be something here...</slot>
        </div>
      </section>
    </div>
  </transition>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
import { IconX } from '@/components/icons/icons'

export default createComponent({
  name: 'Modal',
  components: { IconX },
  props: { show: Boolean }
})
</script>

<style lang="scss" scoped>
.modalContainer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
}
.modalContent {
  position: relative;
  max-width: 80%;
  max-height: 80%;
  background-color: $gray500;
  padding: 2em;
}
.modalTitle {
  margin-top: 0;
}

.closeModalButton {
  position: absolute;
  top: 1.6em;
  right: 1.6em;
  color: $gray200;
  cursor: pointer;
}
.closeModalButton:hover {
  color: $gray100;
}

.modal-enter,
.modal-leave-to {
  transform: translateY(100%);
}
.modal-enter-active,
.modal-leave-active {
  transition: transform 200ms;
}

h2 {
  text-align: center;
}
</style>
