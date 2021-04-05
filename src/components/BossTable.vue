<template>
  <table>
    <thead>
      <tr>
        <th class="name">Name</th>
        <th class="time">Time</th>
        <th class="deaths">Deaths</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(boss, index) in bosses" :key="index">
        <td class="name">{{ boss.name }}</td>
        <td class="time">{{ formatBossTime(boss.time) }}</td>
        <td class="deaths">{{ boss.deaths }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'
import { SaveBoss } from '@/store/savesStore'
import formatBossTime from '@/utils/formatBossTime'

export default defineComponent({
  name: 'BossTable',
  props: {
    bosses: {
      type: Array as PropType<SaveBoss[]>,
      required: true,
    },
  },
  setup() {
    return {
      formatBossTime,
    }
  },
})
</script>

<style lang="scss" scoped>
table {
  border-collapse: collapse;
  max-width: 400px;
}
thead {
  background-color: $primaryColor600;
}
tbody tr:nth-child(odd) {
  background-color: $gray700;
}
tbody tr:nth-child(even) {
  background-color: $gray500;
}
td,
th {
  padding: 12px 15px;
}

.name {
  text-align: left;
}
.time,
.deaths {
  text-align: center;
}
.time {
  white-space: nowrap;
}
</style>
