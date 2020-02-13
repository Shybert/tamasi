<template>
  <div id="titleBar">
    <div>Tamasi</div>

    <div @click="minimizeWindow" id="minimizeWindow" class="titleBarButton">
      <IconHorizontalLine name="Minimize" role="button" />
    </div>

    <div
      @click="isWindowMaximized ? unmaximizeWindow() : maximizeWindow()"
      class="titleBarButton"
    >
      <IconSquare name="Change window size" role="button" />
    </div>

    <div @click="closeWindow" class="titleBarButton">
      <IconX name="Close" role="button" />
    </div>
  </div>
</template>

<script lang="ts">
import { createComponent, ref } from '@vue/composition-api'
import { IconHorizontalLine, IconSquare, IconX } from '@/components/icons/icons'
import { remote } from 'electron'

export default createComponent({
  name: 'TitleBar',
  components: {
    IconSquare,
    IconHorizontalLine,
    IconX
  },
  setup() {
    const window = remote.getCurrentWindow()
    let isWindowMaximized = ref(window.isMaximized())

    window.on('maximize', () => (isWindowMaximized.value = true))
    window.on('unmaximize', () => (isWindowMaximized.value = false))

    function minimizeWindow(): void {
      window.minimize()
    }
    function maximizeWindow(): void {
      window.maximize()
    }
    function unmaximizeWindow(): void {
      window.unmaximize()
    }
    function closeWindow(): void {
      window.close()
    }

    return {
      isWindowMaximized,
      minimizeWindow,
      maximizeWindow,
      unmaximizeWindow,
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
  background-color: $primaryColor;
}
#titleBar div {
  box-sizing: border-box;
  height: $titleBarHeight;
  line-height: $titleBarHeight;
  padding: 0 0.5em;
}

.titleBarButton {
  -webkit-app-region: no-drag;
  display: flex;
  align-items: center;
}
.titleBarButton:hover {
  background-color: $primaryColorLight;
}
#minimizeWindow {
  margin-left: auto;
}
</style>
