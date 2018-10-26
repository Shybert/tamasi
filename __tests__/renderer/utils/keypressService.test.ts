import KeypressService from '../../../src/renderer/utils/keypressService'

jest.mock('../../../src/renderer/utils/acceleratorHelpers', () => ({
  isModifier: jest.fn(key => /^modifier/.test(key)),
  isValidKey: jest.fn(key => /^[a-z]$/.test(key))
}))

describe('keypressService.ts', () => {
  let keypressService: KeypressService
  beforeEach(() => {
    keypressService = new KeypressService()
  })

  test('Error message is null by default', () => {
    expect(keypressService.errorMessage).toBeNull()
  })

  test('Pressing a valid key adds it to the selected keys', () => {
    keypressService.keydown('a')
    expect(keypressService.selectedKeys).toBe('a')
  })

  test('Only a single key can be added to the selected keys', () => {
    keypressService.keydown('a')
    expect(keypressService.selectedKeys).toBe('a')
    keypressService.keydown('b')
    expect(keypressService.selectedKeys).toBe('a')
  })
  test('Pressing more than one key sets an error message', () => {
    keypressService.keydown('a')
    keypressService.keydown('b')
    expect(keypressService.errorMessage).toBe('There can only be a single key (and multiple modifiers).')
  })

  test('Pressing an invalid key sets an error message', () => {
    keypressService.keydown('invalid')
    expect(keypressService.errorMessage).toBe("The key 'invalid' is not a valid key/modifier.")
  })
  test('Pressing invalid keys does not add them to the selected keys', () => {
    keypressService.keydown('invalid1')
    expect(keypressService.selectedKeys).toBe('')
    keypressService.keydown('invalid2')
    keypressService.keydown('invalid3')
    expect(keypressService.selectedKeys).toBe('')
  })

  test('Pressing a modifier key when there are no other selected keys adds the modifier to the selected keys, but also sets an error message', () => {
    keypressService.keydown('modifier')
    expect(keypressService.selectedKeys).toBe('modifier')
    expect(keypressService.errorMessage).toBe('A single modifier is not a valid keybind.')
  })
  test('Pressing a modifier key when there are other selected keys does not set an error message', () => {
    keypressService.keydown('a')
    keypressService.keydown('modifier')
    expect(keypressService.errorMessage).toBeNull()
  })

  test('Keys and modifiers are seperated by a "+"', () => {
    keypressService.keydown('a')
    keypressService.keydown('modifier1')
    expect(keypressService.selectedKeys).toBe('a+modifier1')
    keypressService.keydown('modifier2')
    expect(keypressService.selectedKeys).toBe('a+modifier1+modifier2')

    // It shouldn't matter where the key is
    keypressService.reset()
    keypressService.keydown('modifier')
    keypressService.keydown('a')
    expect(keypressService.selectedKeys).toBe('modifier+a')
  })

  test('The same key is only added once, but no error message is set', () => {
    keypressService.keydown('a')
    keypressService.keydown('a')
    keypressService.keydown('a')
    expect(keypressService.selectedKeys).toBe('a')
    expect(keypressService.errorMessage).toBeNull()
  })
  test('The same modifier is only added once, but no error message is set', () => {
    // Need to add another modifier first for the test, otherwise keypressService.errorMessage will tell you that a single modifier is not a valid keybind (which is correct behavior)
    keypressService.keydown('modifier1')
    keypressService.keydown('modifier2')
    keypressService.keydown('modifier2')
    keypressService.keydown('modifier2')
    expect(keypressService.selectedKeys).toBe('modifier1+modifier2')
    expect(keypressService.errorMessage).toBeNull()
  })

  test('Letting go of a pressed key/modifier does not remove it from the selected keys', () => {
    keypressService.keydown('a')
    expect(keypressService.selectedKeys).toBe('a')
    keypressService.keyup('a')
    expect(keypressService.selectedKeys).toBe('a')
  })
  test('When you press a key/modifier, all keys/modifiers that previously have been let go are removed from the selected keys', () => {
    keypressService.keydown('modifier1')
    keypressService.keydown('modifier2')
    keypressService.keydown('a')
    expect(keypressService.selectedKeys).toBe('modifier1+modifier2+a')

    keypressService.keyup('modifier2')
    keypressService.keydown('modifier3')
    expect(keypressService.selectedKeys).toBe('modifier1+a+modifier3')
  })

  test('Valid input after invalid input sets the error message back to null', () => {
    keypressService.keydown('invalid')
    expect(keypressService.errorMessage).toBeTruthy()
    keypressService.keydown('a')
    expect(keypressService.errorMessage).toBeNull()
  })

  test('Calling reset resets the service', () => {
    keypressService.keydown('a')
    keypressService.keydown('invalid')
    expect(keypressService.selectedKeys).toBe('a')
    expect(keypressService.errorMessage).toBeTruthy()

    keypressService.reset()
    expect(keypressService.selectedKeys).toBe('')
    expect(keypressService.errorMessage).toBeNull()

    // Make sure that when you press a new key, previously pressed keys have been properly removed
    keypressService.keydown('b')
    expect(keypressService.selectedKeys).toBe('b')
  })
})
