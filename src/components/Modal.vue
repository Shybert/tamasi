<template>
  <transition name="modal" appear>
    <div id="modalContainer" @click="$emit('closeModal')">
      <div id="modalContent" @click.stop>
        <div id="modalTitle">
          <h2><slot name="title">Why didn't you pass a title?</slot></h2>
        </div>
        <div id="modalMain">
          <slot name="main">There should be something here...</slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'

export default createComponent({
  name: 'Modal'
})
</script>

<style lang="scss" scoped>
#modalContainer {
  position: fixed;
  top: $titleBarHeight;
  left: 0;
  width: 100vw;
  height: calc(100vh - #{$titleBarHeight});
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
}
#modalContent {
  max-width: 80%;
  max-height: 80%;
  background-color: $overlayColor;
  padding: 2em;
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
