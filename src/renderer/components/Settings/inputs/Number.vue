<template>
  <input class="inputNumber" type="number" :value="value" @input="$emit('input', Number.parseFloat($event.target.value))">
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'

@Component
export default class Number extends Vue {
  @Prop() value!: any
}
</script>
