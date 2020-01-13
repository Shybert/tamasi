<template>
  <label>
    <slot>Label</slot>
  </label>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'

export default createComponent({
  name: 'BaseLabel'
})
</script>

<style lang="scss" scoped>
label {
  display: block;
  margin-bottom: 0.6em;
}
</style>
