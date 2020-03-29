<template>
  <input
    type="text"
    :value="value"
    @input="$emit('input', $event.target.value)"
  />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'BaseInputText',
  props: { value: String },
})
</script>

<style lang="scss" scoped>
input {
  box-sizing: border-box;
  width: 250px;
  padding: 1em;
  background-color: $gray300;
  color: $highEmphasisText;
  border: none;
  margin-bottom: 1em;
}
input:focus {
  outline: 1px solid $primaryColor500;
  outline-offset: 0.5px;
}
</style>
