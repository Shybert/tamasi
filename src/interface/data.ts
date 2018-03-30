/* eslint-disable no-undef */

interface BossInfo {
  name: string
}

interface Bosses {
  [x: string]: BossInfo
}

interface Game {
  name: string,
  bosses: Bosses
}

interface Games {
  [x: string]: Game
}

export {BossInfo, Bosses, Game, Games}
