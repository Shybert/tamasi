<template>
  <div id="app">
    <TitleBar v-if="!isOverlay" />
    <div id="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { createComponent, ref, watch } from '@vue/composition-api'
import TitleBar from '@/components/TitleBar.vue'

export default createComponent({
  name: 'App',
  components: { TitleBar },
  setup(props, ctx) {
    const isOverlay = ref(false)
    watch(() => (isOverlay.value = ctx.root.$route.path.startsWith('/overlay')))
    return { isOverlay }
  }
})
</script>

<style lang="scss" scoped>
#app {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: $gray800;
  color: $highEmphasisText;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

#content {
  flex: 1 1 auto;
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
