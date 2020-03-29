<template>
  <label>
    <div class="label">
      <slot name="label">Label</slot>
    </div>
    <slot name="inputElement">Input element missing!</slot>
  </label>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'

export default createComponent({
  name: 'BaseLabel',
})
</script>

<style lang="scss" scoped>
.label {
  margin-bottom: 0.6em;
}
</style>
