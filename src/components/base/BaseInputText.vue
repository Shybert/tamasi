<template>
  <input
    type="text"
    :value="value"
    @input="$emit('input', $event.target.value)"
  />
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'

export default createComponent({
  name: 'BaseInputText',
  props: { value: String }
})
</script>

<style lang="scss" scoped>
input {
  box-sizing: border-box;
  width: 250px;
  padding: 1em;
  background-color: $inputColor;
  color: $highEmphasisText;
  border: none;
  margin-bottom: 1em;
}
input:focus {
  outline: 1px solid $primaryColor;
  outline-offset: 0.5px;
}
</style>
