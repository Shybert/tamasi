<template>
  <nav>
    <router-link to="/" id="homeLink">Home</router-link>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator'

@Component
export default class Nav extends Vue {}
</script>

