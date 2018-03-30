/* eslint-disable no-undef */

interface BossInfo {
  name: string,
  time: number
}

interface Bosses {
  [x: string]: BossInfo
}

interface Save {
  name: string
  bosses: Bosses
}

export {BossInfo, Bosses, Save}
