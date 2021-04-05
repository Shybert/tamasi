<template>
  <section class="boss">
    <h2 class="name">{{ boss.name }}</h2>

    <div class="deaths">
      <span class="deathCounter">{{ boss.deaths }}</span> deaths
    </div>

    <div class="time">{{ formattedTime }}</div>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import formatBossTime from '@/utils/formatBossTime'

export default defineComponent({
  name: 'BossDetail',
  props: {
    boss: Object,
  },
  setup(props) {
    const formattedTime = computed(() => formatBossTime(props.boss?.time))
    return { formattedTime }
  },
})
</script>

<style lang="scss" scoped>
.boss {
  padding: 0.8em 0.5em;
}

.name {
  margin: 0;
  font-size: 1.3em;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.deaths {
  display: inline-block;
  width: 40%;
}
.time {
  display: inline-block;
  width: 60%;
  text-align: right;
}
.deathCounter,
.time {
  font-size: 2em;
}
</style>
