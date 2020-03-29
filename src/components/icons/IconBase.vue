<template>
  <svg :width="width" :height="height" :aria-labelledby="name" :role="role">
    <title>{{ name }}</title>
    <g :stroke="strokeColor" :fill="fillColor">
      <slot></slot>
    </g>
  </svg>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'

export default createComponent({
  name: 'IconBase',
  props: {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'presentation',
    },
    width: {
      type: [String, Number],
      default: 16,
    },
    height: {
      type: [String, Number],
      default: 16,
    },
    strokeColor: {
      type: String,
      default: 'currentColor',
    },
    fillColor: {
      type: String,
      default: 'currentColor',
    },
  },
})
</script>
