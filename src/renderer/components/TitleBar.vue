<template>
  <div id="titleBar">
    <div>DSDT</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator'

@Component
export default class TitleBar extends Vue {}
</script>

<style scoped>
#titleBar {
  -webkit-app-region: drag;
  -webkit-user-select: none;
  margin: 0;
  background-color: #455A64;
  color: #FFFFFF;
}
</style>
