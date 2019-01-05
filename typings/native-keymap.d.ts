interface IKeyMap {
  [keyName: string]: {
    vkey: string
    value: string
    withShift: string
    withAltGr: string
    withShiftAltGr: string
  }
}

declare module 'native-keymap' {
  function getKeyMap (): IKeyMap
}
