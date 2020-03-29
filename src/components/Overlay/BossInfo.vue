<template>
  <section class="bossInfo">
    <h2 class="bossName">{{ bossInfo.name }}</h2>

    <div class="bossDeaths">
      <span class="bossDeathCounter">{{ bossInfo.deaths }}</span> deaths
    </div>

    <div class="bossTime">{{ formattedTime }}</div>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
// eslint does not properly detect TS interface usage
// eslint-disable-next-line no-unused-vars
import { SaveBoss } from '@/store/savesStore'
import formatBossTime from '@/utils/formatBossTime'

interface Props {
  bossInfo: SaveBoss
}
export default defineComponent({
  name: 'BossInfo',
  // Can be removed when switching to Vue 3
  props: {
    bossInfo: Object,
  },
  setup(props: Props) {
    const formattedTime = computed(() => formatBossTime(props.bossInfo.time))
    return { formattedTime }
  },
})
</script>

<style lang="scss" scoped>
.bossInfo {
  padding: 0.8em 0.5em;
}

.bossName {
  margin: 0;
  font-size: 1.3em;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.bossDeaths {
  display: inline-block;
  width: 40%;
}
.bossTime {
  display: inline-block;
  width: 60%;
  text-align: right;
}
.bossDeathCounter,
.bossTime {
  font-size: 2em;
}
</style>
