<template>
  <IconBase :width="width" :height="height" :name="name" :role="role">
    <rect
      x="0"
      y="0"
      :width="width"
      :height="height"
      :fill="fill"
      :stroke-width="strokeWidth"
    />
  </IconBase>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import IconBase from '@/components/icons/IconBase.vue'

export default defineComponent({
  name: 'IconRectangle',
  components: { IconBase },
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
    fill: {
      type: String,
      default: 'transparent',
    },
    strokeWidth: {
      type: [String, Number],
      default: 4,
    },
  },
})
</script>
