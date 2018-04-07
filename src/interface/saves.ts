/* eslint-disable no-undef */

interface BossInfo {
  name: string,
  time: number,
  deaths: number
}

interface Bosses {
  [x: string]: BossInfo
}

interface Save {
  name: string
  bosses: Bosses
}

interface Saves {
  [x: string]: Save
}

export {BossInfo, Bosses, Save, Saves}
