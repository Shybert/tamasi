<template>
  <IconBase width="10" height="10" :name="name" :role="role">
    <line x1="0" x2="10" y1="10" y2="0" />
    <line x1="0" x2="10" y1="0" y2="10" />
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
      required: true
    },
    role: {
      type: String,
      default: 'presentation'
    }
  }
})
</script>