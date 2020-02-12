<template>
  <IconBase width="10" height="1" :name="name">
    <rect
      x="0"
      y="0"
      width="10"
      height="1"
      fill="transparent"
      stroke-width="1"
    />
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
      required: true
    }
  }
})
</script>