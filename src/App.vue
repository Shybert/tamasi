<template>
  <div id="app">
    <TitleBar />
    <div id="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
import TitleBar from '@/components/TitleBar.vue'

export default createComponent({
  name: 'App',
  components: { TitleBar }
})
</script>

<style lang="scss" scoped>
#app {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

#content {
  flex: 1 1 auto;
  padding: 0.5em;
}
</style>
<style>
html,
body {
  margin: 0;
  width: 100vw;
  height: 100vh;
}
</style>
