<template>
  <div id="app">
    <TitleBar />
    <div id="content">
      <Saves />
      <!-- <router-view /> -->
    </div>
  </div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
import TitleBar from '@/components/TitleBar.vue'
import Saves from '@/views/Saves.vue'

export default createComponent({
  name: 'App',
  components: { TitleBar, Saves }
})
</script>

<style lang="scss" scoped>
#content {
  height: calc(100vh - #{$titleBarHeight});
  box-sizing: border-box;
  padding: 0.5em;
  overflow: auto;
}
</style>
<style>
body {
  margin: 0;
}
</style>
