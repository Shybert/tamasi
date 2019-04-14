interface IGameBossInfo {
  name: string
}
interface IGameBosses {
  [bossName: string]: IGameBossInfo
}
export interface IGame {
  name: string
  bosses: IGameBosses
}
interface IGames {
  [gameName: string]: IGame
}

// Utils
export function getGames(): { id: string; name: string }[] {
  return Object.entries(games).map(([id, game]) => {
    return {
      id,
      name: game.name
    }
  })
}

export const games: IGames = {
  des: {
    name: "Demon's Souls",
    bosses: {}
  },
  ds1: {
    name: 'Dark Souls 1',
    bosses: {
      asylumDemon: {
        name: 'Asylum Demon'
      },
      taurusDemon: {
        name: 'Taurus Demon'
      },
      bellGargoyles: {
        name: 'Bell Gargoyles'
      },
      moonlightButterfly: {
        name: 'Moonlight Butterfly'
      },
      strayDemon: {
        name: 'Stray Demon'
      },
      capraDemon: {
        name: 'Capra Demon'
      },
      gapingDragon: {
        name: 'Gaping Dragon'
      },
      quelaag: {
        name: 'Chaos Witch Quelaag'
      },
      ceaselessDischarge: {
        name: 'Ceaseless Discharge'
      },
      sif: {
        name: 'Great Grey Wolf Sif'
      },
      pinwheel: {
        name: 'Pinwheel'
      },
      ironGolem: {
        name: 'Iron Golem'
      },
      crossbreedPriscilla: {
        name: 'Crossbreed Priscilla'
      },
      gwyndolin: {
        name: 'Dark Sun Gwyndolin'
      },
      ornsteinSmough: {
        name: 'Dragon Slayer Ornstein & Executioner Smough'
      },
      seath: {
        name: 'Seath the Scaleless'
      },
      demonFiresage: {
        name: 'Demon Firesage'
      },
      centipedeDemon: {
        name: 'Centipede Demon'
      },
      bedOfChaos: {
        name: 'Bed Of Chaos'
      },
      fourKings: {
        name: 'Four Kings'
      },
      nito: {
        name: 'Gravelord Nito'
      },
      sanctuaryGuardian: {
        name: 'Sanctuary Guardian'
      },
      artorias: {
        name: 'Knight Artorias'
      },
      manus: {
        name: 'Manus, Father of the Abyss'
      },
      kalameet: {
        name: 'Black Dragon Kalameet'
      },
      gwyn: {
        name: 'Gwyn, Lord of Cinder'
      }
    }
  },
  ds2: {
    name: 'Dark Souls 2',
    bosses: {
      lastGiant: {
        name: 'The Last Giant'
      },
      pursuer: {
        name: 'The Pursuer'
      },
      dragonrider: {
        name: 'Dragonrider'
      },
      dragonslayer: {
        name: 'Old Dragonslayer'
      },
      flexile: {
        name: 'Flexile Sentry'
      },
      sentinels: {
        name: 'Ruin Sentinels'
      },
      sinner: {
        name: 'The Lost Sinner'
      },
      gargoyles: {
        name: 'Belfry Gargoyles'
      },
      skeletonLords: {
        name: 'Skeleton Lords'
      },
      chariot: {
        name: "Executioner's Chariot"
      },
      covetous: {
        name: 'Covetous Demon'
      },
      mytha: {
        name: 'Mytha, the Baneful Queen'
      },
      redSmelter: {
        name: 'Smelter Demon'
      },
      ironKing: {
        name: 'Old Iron King'
      },
      najka: {
        name: 'Scorpioness Najka'
      },
      ratAuthority: {
        name: 'Royal Rat Authority'
      },
      magus: {
        name: 'Prowling Magus & Congregation'
      },
      freja: {
        name: "The Duke's Dear Freja"
      },
      ratVanguard: {
        name: 'Royal Rat Vanguard'
      },
      rotten: {
        name: 'The Rotten'
      },
      dragonriders: {
        name: 'Dragonriders'
      },
      lookingGlass: {
        name: 'Looking Glass Knight'
      },
      demonSong: {
        name: 'Demon of Song'
      },
      velstadt: {
        name: 'Velstadt, the Royal Aegis'
      },
      vendrick: {
        name: 'Vendrick'
      },
      guardianDragon: {
        name: 'Guardian Dragon'
      },
      ancientDragon: {
        name: 'Ancient Dragon'
      },
      giantLord: {
        name: 'Giant Lord'
      },
      throneDuo: {
        name: 'Throne Defender & Throne Watcher'
      },
      nashandra: {
        name: 'Nashandra'
      },
      aldia: {
        name: 'Aldia, Scholar of the First Sin'
      },
      darklurker: {
        name: 'Darklurker'
      },
      elana: {
        name: 'Elana, the Squalid Queen'
      },
      sinh: {
        name: 'Sinh, the Slumbering Dragon'
      },
      gankSquad: {
        name:
          'Afflicted Graverobber, Ancient Soldier Varg & Cerah the Old Explorer'
      },
      fume: {
        name: 'Fume Knight'
      },
      alonne: {
        name: 'Sir Alonne'
      },
      blueSmelter: {
        name: 'Smelter Demon'
      },
      aava: {
        name: "Aava, the King's Pet"
      },
      ivory: {
        name: 'Burnt Ivory King'
      },
      ludZallen: {
        name: "Lud, the King's Pet & Zallen, the King's Pet"
      }
    }
  },
  ds3: {
    name: 'Dark Souls 3',
    bosses: {
      iudex: {
        name: 'Iudex Gundyr'
      },
      vordt: {
        name: 'Vordt of the Boreal Valley'
      },
      greatwood: {
        name: 'Curse-Rotted Greatwood'
      },
      sage: {
        name: 'Crystal Sage'
      },
      deacons: {
        name: 'Deacons of the Deep'
      },
      watchers: {
        name: 'Abyss Watchers'
      },
      wolnir: {
        name: 'High Lord Wolnir'
      },
      demonKing: {
        name: 'Old Demon King'
      },
      sulyvahn: {
        name: 'Pontiff Sulyvahn'
      },
      aldrich: {
        name: 'Aldrich, Devourer of Gods'
      },
      yhorm: {
        name: 'Yhorm the Giant'
      },
      dancer: {
        name: 'Dancer of the Boreal Valley'
      },
      oceiros: {
        name: 'Oceiros, the Consumed King'
      },
      champGundyr: {
        name: 'Champion Gundyr'
      },
      wyvern: {
        name: 'Ancient Wyvern'
      },
      namelessKing: {
        name: 'Nameless King'
      },
      dragonslayerArmour: {
        name: 'Dragonslayer Armour'
      },
      lothric: {
        name: 'Lothric, Younger Prince'
      },
      cinder: {
        name: 'Soul of Cinder'
      },
      friede: {
        name: 'Sister Friede'
      },
      gravetender: {
        name: "Champion's Gravetender & Gravetender Greatwolf"
      },
      demonPrince: {
        name: 'The Demon Prince'
      },
      midir: {
        name: 'Darkeater Midir'
      },
      spearChurch: {
        name: 'Spear of the Church'
      },
      gael: {
        name: 'Slave Knight Gael'
      }
    }
  },
  bb: {
    name: 'Bloodborne',
    bosses: {}
  }
}
