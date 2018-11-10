function isModifier (key: string): boolean {
  const modifiersRegex: RegExp = /^Command|Cmd|Control|Ctrl|CommandOrControl|CmdOrCtrl|Alt|Option|AltGr|Shift|Super$/
  if (modifiersRegex.test(key)) return true
  return false
}

function isValidKey (key: string): boolean {
  const keysRegex: RegExp = /^([a-zA-Z0-9,_:;*?=(){}$&%#"!@^~|'`<>\.\-\[\]\/\\]|F1?([1-9]|10|2[0-4])|Plus|Space|Tab|Backspace|Delete|Insert|Return|Enter|Up|Down|Left|Right|Home|End|PageUp|PageDown|Escape|Esc|VolumeUp|VolumeDown|VolumeMute|MediaNextTrack|MediaPreviousTrack|MediaStop|MediaPlayPause|PrintScreen)$/
  if (keysRegex.test(key)) return true
  return false
}

export function validateKeybind (str: string): string | null {
  if (str === '') return 'Keybind is empty'

  const parts: string[] = str.split('+')
  const modifiers: string[] = []
  let hasKey: boolean = false

  for (let i = 0; i < parts.length; i += 1) {
    const key = parts[i]
    if (isModifier(key)) {
      if (modifiers.includes(key)) return 'Keybinds cannot have multiples of the same modifier'
      modifiers.push(key)
    } else if (isValidKey(key)) {
      if (hasKey) return 'Multiple keys is not a valid keybind'
      hasKey = true
    } else return `The key '${key}' is not a valid key/modifier`
  }

  if (modifiers.length > 0 && !hasKey) return 'A keybind cannot consist solely of modifiers'
  return null
}
