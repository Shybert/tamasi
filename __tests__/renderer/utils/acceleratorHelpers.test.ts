import * as acceleratorHelpers from '../../../src/renderer/utils/acceleratorHelpers'

describe('isValidKeybind()', () => {
  test('An empty string is not a valid keybind', () => {
    expect(acceleratorHelpers.isValidKeybind('')).toBe(false)
  })

  test('A single key is a valid keybind', () => {
    const keys: string[] = ['a', 'A', 'z', 'M', '0', '{', '?', '~', '\\', '*', '.', 'F1', 'F12', 'F24', 'Space', 'Delete', 'End']
    keys.forEach(key => {
      expect(acceleratorHelpers.isValidKeybind(key)).toBe(true)
    })
  })

  test('A single modifier is not a valid keybind', () => {
    const modifiers: string[] = ['Command', 'Cmd', 'CmdOrControl', 'AltGr', 'Shift']
    modifiers.forEach(modifier => {
      expect(acceleratorHelpers.isValidKeybind(modifier)).toBe(false)
    })
  })

  test('One or multiple modifiers and a single key is a valid keybind', () => {
    expect(acceleratorHelpers.isValidKeybind('Ctrl+C')).toBe(true)
    expect(acceleratorHelpers.isValidKeybind('C+Ctrl')).toBe(true)
    expect(acceleratorHelpers.isValidKeybind('Command+Shift+Alt+O')).toBe(true)
    expect(acceleratorHelpers.isValidKeybind('CommandOrControl+3+Shift+Super')).toBe(true)
  })

  test('Multiple keys is not a valid keybind', () => {
    expect(acceleratorHelpers.isValidKeybind('A+z')).toBe(false)
    expect(acceleratorHelpers.isValidKeybind('\\+*+1+F1+Space')).toBe(false)
    expect(acceleratorHelpers.isValidKeybind('Delete+<+!+|')).toBe(false)
    expect(acceleratorHelpers.isValidKeybind('Shift+C+F24')).toBe(false)
    expect(acceleratorHelpers.isValidKeybind('Control+AltGr+A+Shift+p')).toBe(false)
  })
})
