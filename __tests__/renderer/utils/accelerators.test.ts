import * as accelerators from '../../../src/renderer/utils/accelerators'

describe('isValidKeybind()', () => {
  test('An empty string is not a valid keybind', () => {
    expect(accelerators.isValidKeybind('')).toBe(false)
  })

  test('A single key is a valid keybind', () => {
    const keys: string[] = ['a', 'A', 'z', 'M', '0', '{', '?', '~', '\\', '*', '.', 'F1', 'F12', 'F24', 'Space', 'Delete', 'End']
    keys.forEach(key => {
      expect(accelerators.isValidKeybind(key)).toBe(true)
    })
  })

  test('A single modifier is not a valid keybind', () => {
    const modifiers: string[] = ['Command', 'Cmd', 'CmdOrControl', 'AltGr', 'Shift']
    modifiers.forEach(modifier => {
      expect(accelerators.isValidKeybind(modifier)).toBe(false)
    })
  })

  test('One or multiple modifiers and a single key is a valid keybind', () => {
    expect(accelerators.isValidKeybind('Ctrl+C')).toBe(true)
    expect(accelerators.isValidKeybind('C+Ctrl')).toBe(true)
    expect(accelerators.isValidKeybind('Command+Shift+Alt+O')).toBe(true)
    expect(accelerators.isValidKeybind('CommandOrControl+3+Shift+Super')).toBe(true)
  })

  test('Multiple keys is not a valid keybind', () => {
    expect(accelerators.isValidKeybind('A+z')).toBe(false)
    expect(accelerators.isValidKeybind('\\+*+1+F1+Space')).toBe(false)
    expect(accelerators.isValidKeybind('Delete+<+!+|')).toBe(false)
    expect(accelerators.isValidKeybind('Shift+C+F24')).toBe(false)
    expect(accelerators.isValidKeybind('Control+AltGr+A+Shift+p')).toBe(false)
  })
})
