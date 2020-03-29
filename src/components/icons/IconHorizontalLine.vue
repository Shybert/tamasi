<template>
  <IconBase :width="width" :height="height" :name="name" :role="role">
    <rect x="0" y="0" :width="width" :height="height" stroke-width="1" />
  </IconBase>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
import IconBase from '@/components/icons/IconBase.vue'

export default createComponent({
  name: 'IconHorizontalLine',
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
      default: 4,
    },
  },
})
</script>
