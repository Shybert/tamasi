<template>
  <div
    aria-haspopup="listbox"
    ref="root"
    class="select"
    tabindex="0"
    @keydown.up="selectPrevious"
    @keydown.down="selectNext"
    @keydown.enter="toggle"
    @blur="close(false)"
  >
    <div @click="toggle" class="selected">
      {{ options[selected].label }}
    </div>

    <ul
      role="listbox"
      :style="{ maxHeight: maxHeight + 'px' }"
      class="options"
      v-if="isOpen"
    >
      <li
        role="option"
        class="option"
        v-for="(option, index) in options"
        :key="index"
        :class="{ highlighted: highlighted === index }"
        @mouseover="highlighted = index"
        @click="toggle"
      >
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { createComponent, ref } from '@vue/composition-api'

function distanceToBottom(element: HTMLElement) {
  return window.innerHeight - element.getBoundingClientRect().bottom
}

interface IOption {
  label: string
  value: string
}
interface IProps {
  value: string
  options: IOption[]
}

export default createComponent({
  name: 'BaseSelect',
  props: { value: String, options: Array },
  setup(props: IProps, ctx) {
    const selected = ref(
      props.options.findIndex(option => option.value === props.value)
    )
    const highlighted = ref(selected.value)

    function setSelected(index: number) {
      selected.value = index
      ctx.emit('input', props.options[index].value)
    }

    function selectNext() {
      if (highlighted.value !== props.options.length - 1) {
        highlighted.value += 1
        setSelected(highlighted.value)
      }
    }
    function selectPrevious() {
      if (highlighted.value !== 0) {
        highlighted.value -= 1
        setSelected(highlighted.value)
      }
    }

    const isOpen = ref(false)
    const root = ref<HTMLElement>(null)
    const maxHeight = ref(0)

    function open() {
      isOpen.value = true
      if (root.value) maxHeight.value = distanceToBottom(root.value) - 25
    }
    function close(changeSelected: boolean) {
      isOpen.value = false
      changeSelected
        ? setSelected(highlighted.value)
        : // If not setting selected, highlighted should be reset
          (highlighted.value = selected.value)
    }
    function toggle() {
      isOpen.value ? close(true) : open()
    }

    return {
      selected,
      highlighted,
      selectNext,
      selectPrevious,

      isOpen,
      root,
      maxHeight,
      close,
      toggle
    }
  }
})
</script>

<style lang="scss" scoped>
.select {
  background-color: $gray300;
  position: relative;
  margin-bottom: 1em;
  width: 250px;
  box-sizing: border-box;
}
.select:focus {
  outline: 1px solid $primaryColor500;
  outline-offset: 0.5px;
}
.selected,
.option {
  padding: 0.5em 1em;
}
.options {
  background-color: $gray300;
  position: absolute;
  width: 100%;
  overflow: auto;
  outline: 1px solid $primaryColor500;
  outline-offset: 0.5px;
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.options:focus {
  outline: 1px solid $primaryColor500;
  outline-offset: 0.5px;
}
.option {
  margin-left: 0;
}
.highlighted {
  background-color: $primaryColor500;
}
</style>
