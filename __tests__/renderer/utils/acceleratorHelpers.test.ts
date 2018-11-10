import * as acceleratorHelpers from '../../../src/renderer/utils/acceleratorHelpers'

describe('validateKeybind()', () => {
  test('A single key is a valid keybind', () => {
    const keys: string[] = ['a', 'A', 'z', 'M', '0', '{', '?', '~', '\\', '*', '.', 'F1', 'F12', 'F24', 'Space', 'Delete', 'End']
    keys.forEach(key => {
      expect(acceleratorHelpers.validateKeybind(key)).toBeNull()
    })
  })
  test('One or multiple modifiers and a single key is a valid keybind', () => {
    expect(acceleratorHelpers.validateKeybind('Ctrl+C')).toBeNull()
    expect(acceleratorHelpers.validateKeybind('C+Ctrl')).toBeNull()
    expect(acceleratorHelpers.validateKeybind('Command+Shift+Alt+O')).toBeNull()
    expect(acceleratorHelpers.validateKeybind('CommandOrControl+3+Shift+Super')).toBeNull()
  })

  test('An empty string is not a valid keybind', () => {
    const errorMessage: string = 'Keybind is empty'
    expect(acceleratorHelpers.validateKeybind('')).toBe(errorMessage)
  })
  test('Multiple keys is not a valid keybind', () => {
    const errorMessage: string = 'Multiple keys is not a valid keybind'
    expect(acceleratorHelpers.validateKeybind('A+z')).toBe(errorMessage)
    expect(acceleratorHelpers.validateKeybind('A+A+A')).toBe(errorMessage)
    expect(acceleratorHelpers.validateKeybind('\\+*+1+F1+Space')).toBe(errorMessage)
    expect(acceleratorHelpers.validateKeybind('Delete+<+!+|')).toBe(errorMessage)
    expect(acceleratorHelpers.validateKeybind('Shift+C+F24')).toBe(errorMessage)
    expect(acceleratorHelpers.validateKeybind('Control+AltGr+A+Shift+p')).toBe(errorMessage)
  })
  test('Invalid keys/modifiers are not a valid keybind', () => {
    let errorMessage: string = "The key 'invalid' is not a valid key/modifier"
    expect(acceleratorHelpers.validateKeybind('invalid')).toBe(errorMessage)
  })
  test('Keybinds consisting solely of modifiers are not valid keybinds', () => {
    const errorMessage: string = 'A keybind cannot consist solely of modifiers'
    expect(acceleratorHelpers.validateKeybind('Command')).toBe(errorMessage)
    expect(acceleratorHelpers.validateKeybind('Command+Cmd')).toBe(errorMessage)
    expect(acceleratorHelpers.validateKeybind('Shift+Command+Cmd+AltGr')).toBe(errorMessage)
  })
  test('Multiples of the same modifier is not a valid keybind', () => {
    const errorMessage: string = 'Keybinds cannot have multiples of the same modifier'
    expect(acceleratorHelpers.validateKeybind('Ctrl+Ctrl')).toBe(errorMessage)
    expect(acceleratorHelpers.validateKeybind('Ctrl+Ctrl+a')).toBe(errorMessage)
    expect(acceleratorHelpers.validateKeybind('Control+a+Command+Cmd+Shift+AltGr+Control')).toBe(errorMessage)
  })
})
