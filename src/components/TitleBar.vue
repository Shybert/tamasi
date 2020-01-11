<template>
  <div id="titleBar">
    <div>Tamasi</div>

    <div id="minimizeWindow" @click="minimizeWindow" class="titleBarButton">
      Minimize
    </div>

    <div
      id="maximizeWindow"
      v-if="!isWindowMaximized"
      @click="maximizeWindow"
      class="titleBarButton"
    >
      Maximize
    </div>
    <div
      id="unmaximizeWindow"
      v-if="isWindowMaximized"
      @click="unmaximizeWindow"
      class="titleBarButton"
    >
      Unmaximize
    </div>

    <div id="closeWindow" @click="closeWindow" class="titleBarButton">
      Close
    </div>
  </div>
</template>

<script lang="ts">
import { createComponent, ref } from '@vue/composition-api'
import { remote } from 'electron'

export default createComponent({
  name: 'TitleBar',
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
}
#minimizeWindow {
  margin-left: auto;
}
#closeWindow:hover {
  background-color: red;
}
</style>
