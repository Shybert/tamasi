<template>
  <label>
    <div class="label">
      <slot name="label">Label</slot>
    </div>
    <slot name="inputElement">Input element missing!</slot>
  </label>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'BaseLabel',
})
</script>

<style lang="scss" scoped>
.label {
  margin-bottom: 0.6em;
}
</style>
