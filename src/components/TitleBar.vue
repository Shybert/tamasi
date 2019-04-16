<template>
  <div id="titleBar">
    <div>DSDT</div>

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
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { remote } from 'electron'

@Component
export default class TitleBar extends Vue {
  currentWindow = remote.getCurrentWindow()
  isWindowMaximized: boolean = this.currentWindow.isMaximized()

  created() {
    this.currentWindow.addListener(
      'maximize',
      () => (this.isWindowMaximized = true)
    )
    this.currentWindow.addListener(
      'unmaximize',
      () => (this.isWindowMaximized = false)
    )
  }

  minimizeWindow(): void {
    this.currentWindow.minimize()
  }
  maximizeWindow(): void {
    this.currentWindow.maximize()
  }
  unmaximizeWindow(): void {
    this.currentWindow.unmaximize()
  }
  closeWindow(): void {
    this.currentWindow.close()
  }
}
</script>

<style lang="scss" scoped>
#titleBar {
  -webkit-app-region: drag;
  -webkit-user-select: none;
  display: flex;
  height: $titleBarHeight;
  background-color: #455a64;
  color: #ffffff;
}
#titleBar div {
  box-sizing: border-box;
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
