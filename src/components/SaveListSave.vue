<template>
  <li
    class="save"
    :class="{ selected: save.id == selectedSaveId }"
    @click="selectSave(save.id)"
    :title="save.name"
  >
    {{ save.name }}
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'
import { Save } from '@/store/savesStore'

export default defineComponent({
  name: 'SaveListSave',
  props: {
    save: {
      type: Object as PropType<Save>,
      required: true,
    },
    selectedSaveId: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    function selectSave(saveId: string) {
      emit('selectSave', saveId)
    }

    return {
      selectSave,
    }
  },
})
</script>

<style lang="scss" scoped>
.save {
  overflow: hidden;
  text-overflow: ellipsis;
  color: $mediumEmphasisText;
  margin: 0.3em 0.25em;
  padding: 0.3em 0.5em;
  border-radius: 4px;
  cursor: pointer;
}
.save:hover {
  background-color: $gray300;
  color: $highEmphasisText;
}
.selected,
.selected:hover {
  cursor: default;
  background-color: $primaryColor500;
  color: $highEmphasisText;
}
</style>
