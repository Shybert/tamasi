import KeypressService from '@/utils/keypressService'

function getKeyboardEvent(key: string, repeat?: true): KeyboardEvent {
  return {
    key,
    repeat: repeat ? repeat : false
  } as KeyboardEvent
}

describe('keypressService.ts', () => {
  let keypressService: KeypressService
  beforeEach(() => {
    keypressService = new KeypressService()
  })

  test('Pressing a key adds it to the keybind', () => {
    keypressService.keydown(getKeyboardEvent('a'))
    expect(keypressService.keybind).toBe('a')
  })

  test('Keys are seperated by a "+"', () => {
    keypressService.keydown(getKeyboardEvent('a'))
    keypressService.keydown(getKeyboardEvent('b'))
    expect(keypressService.keybind).toBe('a+b')
    keypressService.keydown(getKeyboardEvent('c'))
    expect(keypressService.keybind).toBe('a+b+c')
  })

  test('The same key is only added once', () => {
    keypressService.keydown(getKeyboardEvent('a'))
    keypressService.keydown(getKeyboardEvent('a', true))
    keypressService.keydown(getKeyboardEvent('a', true))
    expect(keypressService.keybind).toBe('a')
  })

  test('Letting go of a pressed key does not remove it from the keybind', () => {
    keypressService.keydown(getKeyboardEvent('a'))
    expect(keypressService.keybind).toBe('a')
    keypressService.keyup(getKeyboardEvent('a'))
    expect(keypressService.keybind).toBe('a')
  })
  test('When you press a key, all keys that previously have been let go are removed from the keybind', () => {
    keypressService.keydown(getKeyboardEvent('a'))
    keypressService.keydown(getKeyboardEvent('b'))
    keypressService.keydown(getKeyboardEvent('c'))
    expect(keypressService.keybind).toBe('a+b+c')

    keypressService.keyup(getKeyboardEvent('b'))
    keypressService.keydown(getKeyboardEvent('d'))
    expect(keypressService.keybind).toBe('a+c+d')
  })

  test('Calling reset resets the service', () => {
    keypressService.keydown(getKeyboardEvent('a'))
    expect(keypressService.keybind).toBe('a')

    keypressService.reset()
    expect(keypressService.keybind).toBe('')

    // Make sure that when you press a new key, previously pressed keys have been properly removed
    keypressService.keydown(getKeyboardEvent('b'))
    expect(keypressService.keybind).toBe('b')
  })
})
