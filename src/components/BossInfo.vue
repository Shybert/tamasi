<template>
  <section>
    <h2>{{ bossInfo.name }}</h2>

    <div>{{ formattedTime }}</div>

    <div>{{ bossInfo.deaths }} deaths</div>
  </section>
</template>

<script lang="ts">
import { createComponent, computed } from '@vue/composition-api'
// eslint does not properly detect TS interface usage
// eslint-disable-next-line no-unused-vars
import { ISaveBossInfo } from '@/store/savesStore'
import formatBossTime from '@/utils/formatBossTime'

interface IProps {
  bossInfo: ISaveBossInfo
}
export default createComponent({
  name: 'BossInfo',
  props: {
    bossInfo: Object
  },
  setup(props: IProps) {
    const formattedTime = computed(() => formatBossTime(props.bossInfo.time))

    return {
      formattedTime
    }
  }
})
</script>
