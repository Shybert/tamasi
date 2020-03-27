<template>
  <section id="titleBar">
    <div>Tamasi</div>

    <div @click="minimizeWindow" id="minimizeWindow" class="titleBarButton">
      <IconHorizontalLine name="Minimize" role="button" width="10" height="1" />
    </div>

    <div @click="changeWindowMaximization" class="titleBarButton">
      <IconRectangle
        name="Change window size"
        role="button"
        width="10"
        height="10"
        fill="transparent"
        strokeWidth="2"
      />
    </div>

    <div @click="closeWindow" class="titleBarButton">
      <IconX
        name="Close"
        role="button"
        width="10"
        height="10"
        strokeWidth="1"
      />
    </div>
  </section>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
import {
  IconHorizontalLine,
  IconRectangle,
  IconX
} from '@/components/icons/icons'
import { ipcRenderer } from 'electron'

export default createComponent({
  name: 'TheTitleBar',
  components: {
    IconRectangle,
    IconHorizontalLine,
    IconX
  },
  setup() {
    function minimizeWindow(): void {
      ipcRenderer.send('minimizeWindow')
    }
    function changeWindowMaximization(): void {
      ipcRenderer.send('changeWindowMaximization')
    }
    function closeWindow(): void {
      ipcRenderer.send('closeWindow')
    }

    return {
      minimizeWindow,
      changeWindowMaximization,
      closeWindow
    }
  }
})
</script>

<style lang="scss" scoped>
#titleBar {
  -webkit-app-region: drag;
  -webkit-user-select: none;
  display: flex;
  height: $titleBarHeight;
  line-height: $titleBarHeight;
  background-color: $primaryColor500;
  z-index: 10;
}
#titleBar div {
  box-sizing: border-box;
  padding: 0 0.5em;
}

.titleBarButton {
  -webkit-app-region: no-drag;
  display: flex;
  align-items: center;
}
.titleBarButton:hover {
  background-color: $primaryColor300;
}
#minimizeWindow {
  margin-left: auto;
}
</style>
