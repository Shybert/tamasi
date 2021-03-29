<template>
  <li class="game">
    <div
      class="gameName"
      @click="game.collapseSaves = !game.collapseSaves"
      :title="game.name"
    >
      <IconAngle
        name="Collapse/Expand"
        :transform="game.collapseSaves ? 'rotate(-90)' : ''"
      />
      {{ game.shortName ? game.shortName : game.name }}
    </div>

    <slot></slot>
  </li>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { IconAngle } from '@/components/icons/icons'

export default defineComponent({
  name: 'SaveListGame',
  components: { IconAngle },
  props: {
    game: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    return {
      game: props.game,
    }
  },
})
</script>

<style lang="scss" scoped>
.game {
  margin-bottom: 0.5em;
}
.gameName {
  color: $mediumEmphasisText;
  cursor: pointer;
}
.gameName:hover {
  color: $highEmphasisText;
}
</style>
