import KeypressService from '../../../src/renderer/utils/keypressService'

describe('keypressService.ts', () => {
  let keypressService: KeypressService
  beforeEach(() => {
    keypressService = new KeypressService()
  })

  test('Pressing a key adds it to the selected keys', () => {
    keypressService.keydown('a')
    expect(keypressService.selectedKeys).toBe('a')
  })

  test('Keys are seperated by a "+"', () => {
    keypressService.keydown('a')
    keypressService.keydown('b')
    expect(keypressService.selectedKeys).toBe('a+b')
    keypressService.keydown('c')
    expect(keypressService.selectedKeys).toBe('a+b+c')
  })

  test('The same key is only added once', () => {
    keypressService.keydown('a')
    keypressService.keydown('a')
    keypressService.keydown('a')
    expect(keypressService.selectedKeys).toBe('a')
  })

  test('Letting go of a pressed key does not remove it from the selected keys', () => {
    keypressService.keydown('a')
    expect(keypressService.selectedKeys).toBe('a')
    keypressService.keyup('a')
    expect(keypressService.selectedKeys).toBe('a')
  })
  test('When you press a key, all keys that previously have been let go are removed from the selected keys', () => {
    keypressService.keydown('a')
    keypressService.keydown('b')
    keypressService.keydown('c')
    expect(keypressService.selectedKeys).toBe('a+b+c')

    keypressService.keyup('b')
    keypressService.keydown('d')
    expect(keypressService.selectedKeys).toBe('a+c+d')
  })

  test('Calling reset resets the service', () => {
    keypressService.keydown('a')
    expect(keypressService.selectedKeys).toBe('a')

    keypressService.reset()
    expect(keypressService.selectedKeys).toBe('')

    // Make sure that when you press a new key, previously pressed keys have been properly removed
    keypressService.keydown('b')
    expect(keypressService.selectedKeys).toBe('b')
  })
})
