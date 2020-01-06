import { createStore } from './store'
import { computed } from '@vue/composition-api'
import * as crypto from 'crypto'

export interface ISaveBoss {
  name: string
  time: number
  deaths: number
}
export interface ISave {
  id: string
  name: string
  bosses: ISaveBoss[]
  selected: number
}
interface IGame {
  id: string
  name: string
  shortName?: string
  bosses: string[]
  saves: ISave[]
}

function generateSave(bossNames: string[], saveName: string): ISave {
  const bosses: ISaveBoss[] = []
  bossNames.forEach(bossName => {
    bosses.push({
      name: bossName,
      time: 0,
      deaths: 0
    })
  })

  const save: ISave = {
    id: crypto.randomBytes(16).toString('hex'),
    name: saveName,
    bosses,
    selected: 0
  }

  return save
}

interface ISavesState {
  games: IGame[]
  selectedSaveId: string
}
const savesState: ISavesState = {
  games: [
    {
      id: 'DeS',
      name: "Demon's Souls",
      bosses: [],
      saves: []
    },
    {
      id: 'DS1',
      name: 'Dark Souls 1',
      bosses: [
        'Asylum Demon',
        'Taurus Demon',
        'Bell Gargoyles',
        'Moonlight Butterfly',
        'Stray Demon',
        'Capra Demon',
        'Gaping Dragon',
        'Chaos Witch Quelaag',
        'Ceaseless Discharge',
        'Great Grey Wolf Sif',
        'Pinwheel',
        'Iron Golem',
        'Crossbreed Priscilla',
        'Dark Sun Gwyndolin',
        'Dragon Slayer Ornstein & Executioner Smough',
        'Seath the Scaleless',
        'Demon Firesage',
        'Centipede Demon',
        'Bed Of Chaos',
        'Four Kings',
        'Gravelord Nito',
        'Sanctuary Guardian',
        'Knight Artorias',
        'Manus, Father of the Abyss',
        'Black Dragon Kalameet',
        'Gwyn, Lord of Cinder'
      ],
      saves: []
    },
    {
      id: 'DS2',
      name: 'Dark Souls 2',
      bosses: [
        'The Last Giant',
        'The Pursuer',
        'Dragonrider',
        'Old Dragonslayer',
        'Flexile Sentry',
        'Ruin Sentinels',
        'The Lost Sinner',
        'Belfry Gargoyles',
        'Skeleton Lords',
        "Executioner's Chariot",
        'Covetous Demon',
        'Mytha, the Baneful Queen',
        'Smelter Demon',
        'Old Iron King',
        'Scorpioness Najka',
        'Royal Rat Authority',
        'Prowling Magus & Congregation',
        "The Duke's Dear Freja",
        'Royal Rat Vanguard',
        'The Rotten',
        'Dragonriders',
        'Looking Glass Knight',
        'Demon of Song',
        'Velstadt, the Royal Aegis',
        'Vendrick',
        'Guardian Dragon',
        'Ancient Dragon',
        'Giant Lord',
        'Throne Defender & Throne Watcher',
        'Nashandra',
        'Aldia, Scholar of the First Sin',
        'Darklurker',
        'Elana, the Squalid Queen',
        'Sinh, the Slumbering Dragon',
        'Afflicted Graverobber, Ancient Soldier Varg & Cerah the Old Explorer',
        'Fume Knight',
        'Sir Alonne',
        'Smelter Demon',
        "Aava, the King's Pet",
        'Burnt Ivory King',
        "Lud, the King's Pet & Zallen, the King's Pet"
      ],
      saves: []
    },
    {
      id: 'DS3',
      name: 'Dark Souls 3',
      bosses: [
        'Iudex Gundyr',
        'Vordt of the Boreal Valley',
        'Curse-Rotted Greatwood',
        'Crystal Sage',
        'Deacons of the Deep',
        'Abyss Watchers',
        'High Lord Wolnir',
        'Old Demon King',
        'Pontiff Sulyvahn',
        'Aldrich, Devourer of Gods',
        'Yhorm the Giant',
        'Dancer of the Boreal Valley',
        'Oceiros, the Consumed King',
        'Champion Gundyr',
        'Ancient Wyvern',
        'Nameless King',
        'Dragonslayer Armour',
        'Lothric, Younger Prince',
        'Soul of Cinder',
        'Sister Friede',
        "Champion's Gravetender & Gravetender Greatwolf",
        'The Demon Prince',
        'Darkeater Midir',
        'Spear of the Church',
        'Slave Knight Gael'
      ],
      saves: []
    },
    {
      id: 'Bb',
      name: 'Bloodborne',
      bosses: [],
      saves: []
    },
    {
      id: 'Sekiro',
      name: 'Sekiro: Shadows Die Twice',
      shortName: 'Sekiro',
      bosses: [
        'Placeholder 1',
        'Placeholder 2',
        'Placeholder 3',
        'Placeholder 4',
        'Placeholder 5',
        'Placeholder 6',
        'Placeholder 7',
        'Placeholder 8',
        'Placeholder 9',
        'Placeholder 10',
        'Placeholder 11',
        'Placeholder 12',
        'Placeholder 13',
        'Placeholder 14',
        'Placeholder 15',
        'Placeholder 16',
        'Placeholder 17',
        'Placeholder 18',
        'Placeholder 19',
        'Placeholder 20',
        'Placeholder 21',
        'Placeholder 22',
        'Placeholder 23',
        'Placeholder 24',
        'Placeholder 25',
        'Placeholder 26',
        'Placeholder 27',
        'Placeholder 28',
        'Placeholder 29',
        'Placeholder 30'
      ],
      saves: []
    }
  ],
  selectedSaveId: ''
}

export const useSavesStore = createStore('saves', savesState)

export function createSave(gameId: string, saveName: string): boolean {
  const store = useSavesStore()

  const game = store.state.games.find(game => game.id === gameId)
  if (!game) return false

  const bossNames = game.bosses
  const save = generateSave(bossNames, saveName)
  game.saves.push(save)
  return true
}

export const selectedSave = computed(() => {
  const store = useSavesStore()

  for (const game of store.state.games) {
    const selectedSave = game.saves.find(
      save => save.id === store.state.selectedSaveId
    )
    if (selectedSave) return selectedSave
  }
  return undefined
})
