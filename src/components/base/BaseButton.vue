<template>
  <button @click="$emit('click', $event)" type="button">
    <slot>Submit</slot>
  </button>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'

export default createComponent({
  name: 'BaseButton',
})
</script>

<style lang="scss" scoped>
button {
  display: block;
  margin: auto;
  padding: 0.9em 1em;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  background-color: $primaryColor500;
  transition: background-color 0.25s;
  color: $highEmphasisText;
  box-shadow: 0 4px 1px -1px $primaryColor800;
}
button:hover {
  background-color: $primaryColor600;
}
</style>
