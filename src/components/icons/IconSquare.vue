<template>
  <IconBase width="10" height="10" :name="name">
    <rect
      x="0"
      y="0"
      width="10"
      height="10"
      fill="transparent"
      stroke-width="2"
    />
  </IconBase>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
import IconBase from '@/components/icons/IconBase.vue'

export default createComponent({
  name: 'IconSquare',
  components: { IconBase },
  props: {
    name: {
      type: String,
      required: true
    }
  }
})
</script>