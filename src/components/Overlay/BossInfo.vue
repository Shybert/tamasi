<template>
  <section id="bossInfo">
    <h2 id="bossName">{{ bossInfo.name }}</h2>

    <div id="bossDeaths">
      <span id="deathCount">{{ bossInfo.deaths }}</span> deaths
    </div>

    <div id="bossTime">{{ formattedTime }}</div>
  </section>
</template>

<script lang="ts">
import { createComponent, computed } from '@vue/composition-api'
// eslint does not properly detect TS interface usage
// eslint-disable-next-line no-unused-vars
import { ISaveBoss } from '@/store/savesStore'
import formatBossTime from '@/utils/formatBossTime'

interface IProps {
  bossInfo: ISaveBoss
}
export default createComponent({
  name: 'BossInfo',
  // Can be removed when switching to Vue 3
  props: {
    bossInfo: Object
  },
  setup(props: IProps) {
    const formattedTime = computed(() => formatBossTime(props.bossInfo.time))
    return { formattedTime }
  }
})
</script>

<style lang="scss" scoped>
#bossInfo {
  padding: 0.8em 0.5em;
}

#bossName {
  margin: 0;
  font-size: 1.3em;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
#bossDeaths {
  display: inline-block;
  width: 40%;
}
#bossTime {
  display: inline-block;
  width: 60%;
  text-align: right;
}
#deathCount,
#bossTime {
  font-size: 2em;
}
</style>
