<template>
  <svg :width="width" :height="height" :aria-labelledby="name">
    <title :id="name">{{ name }}</title>
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
      required: true
    },
    width: {
      type: [String, Number],
      default: 16
    },
    height: {
      type: [String, Number],
      default: 16
    },
    strokeColor: {
      type: String,
      default: 'currentColor'
    },
    fillColor: {
      type: String,
      default: 'currentColor'
    }
  }
})
</script>