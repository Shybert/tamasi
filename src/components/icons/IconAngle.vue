<template>
  <IconBase width="10" height="10" :name="name" :role="role">
    <line x1="0" x2="5" y1="2" y2="7" />
    <line x1="5" x2="10" y1="7" y2="2" />
  </IconBase>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
import IconBase from '@/components/icons/IconBase.vue'

export default createComponent({
  name: 'IconAngle',
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