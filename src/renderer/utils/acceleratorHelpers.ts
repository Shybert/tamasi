export function isModifier (key: string): boolean {
  const modifiersRegex: RegExp = /^Command|Cmd|Control|Ctrl|CommandOrControl|CmdOrCtrl|Alt|Option|AltGr|Shift|Super$/
  if (modifiersRegex.test(key)) return true
  return false
}

export function isValidKey (key: string): boolean {
  const keysRegex: RegExp = /^([a-zA-Z0-9,_:;*?=(){}$&%#"!@^~|'`<>\.\-\[\]\/\\]|F1?([1-9]|10|2[0-4])|Plus|Space|Tab|Backspace|Delete|Insert|Return|Enter|Up|Down|Left|Right|Home|End|PageUp|PageDown|Escape|Esc|VolumeUp|VolumeDown|VolumeMute|MediaNextTrack|MediaPreviousTrack|MediaStop|MediaPlayPause|PrintScreen)$/
  if (keysRegex.test(key)) return true
  return false
}

export function isValidKeybind (str: string): boolean {
  const parts: string[] = str.split('+')
  const modifiers: string[] = []

  let hasKey: boolean = false
  const partsValid: boolean = parts.every(part => {
    if (isModifier(part) && !modifiers.includes(part)) return true
    if (isValidKey(part)) {
      if (hasKey) return false // There can only be one key
      hasKey = true
      return true
    }

    return false
  })

  if (hasKey && partsValid) return true
  return false
}
