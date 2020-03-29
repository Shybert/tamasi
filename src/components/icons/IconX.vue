<template>
  <IconBase :width="width" :height="height" :name="name" :role="role">
    <line x1="0" :x2="width" :y1="height" y2="0" :stroke-width="strokeWidth" />
    <line x1="0" :x2="width" y1="0" :y2="height" :stroke-width="strokeWidth" />
  </IconBase>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
import IconBase from '@/components/icons/IconBase.vue'

export default createComponent({
  name: 'IconX',
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
    strokeWidth: {
      type: [String, Number],
      default: 4,
    },
  },
})
</script>
