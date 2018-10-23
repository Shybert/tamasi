import KeypressService from '../../../src/renderer/utils/keypressService'

import {isValidKeybind} from '../../../src/renderer/utils/acceleratorHelpers'
jest.mock('../../../src/renderer/utils/acceleratorHelpers', () => ({
  isValidKeybind: jest.fn()
}))
const mockedIsValidKeybind = isValidKeybind as jest.Mock

describe('keypressService.ts', () => {
  let keypressService: KeypressService
  beforeEach(() => {
    keypressService = new KeypressService()
  })

  test('Pressing a valid key adds it to the selected keys', () => {
    mockedIsValidKeybind.mockReturnValue(true)
    keypressService.keydown('a')
    expect(keypressService.selectedKeys).toBe('a')
  })

  test('Pressing multiple valid keys adds them all to the selected keys, seperated by a "+"', () => {
    mockedIsValidKeybind.mockReturnValue(true)
    keypressService.keydown('a')
    keypressService.keydown('b')
    expect(keypressService.selectedKeys).toBe('a+b')
    keypressService.keydown('c')
    expect(keypressService.selectedKeys).toBe('a+b+c')
  })

  test('If there are no previously selected keys it checks if the pressed key is valid', () => {
    keypressService.keydown('a')
    expect(mockedIsValidKeybind).toBeCalledWith('a')
  })
  test('If there are previously selected keys, it checks if the selected keys + the pressed key is valid', () => {
    mockedIsValidKeybind.mockReturnValue(true)
    keypressService.keydown('a')
    keypressService.keydown('b')
    keypressService.keydown('c')
    expect(mockedIsValidKeybind).toBeCalledWith('a+b+c')
  })

  test('A key is only added to the selected keys once', () => {
    mockedIsValidKeybind.mockReturnValue(true)
    keypressService.keydown('a')
    keypressService.keydown('a')
    keypressService.keydown('a')
    expect(keypressService.selectedKeys).toBe('a')
  })

  test('Pressing invalid keys does not add them to the selected keys', () => {
    mockedIsValidKeybind.mockReturnValue(false).mockReturnValueOnce(true)
    keypressService.keydown('a')
    expect(keypressService.selectedKeys).toBe('a')
    keypressService.keydown('b')
    expect(keypressService.selectedKeys).toBe('a')
    keypressService.keydown('c')
    keypressService.keydown('d')
    expect(keypressService.selectedKeys).toBe('a')
  })

  test('Letting go of a pressed key does not remove it from the selected keys', () => {
    mockedIsValidKeybind.mockReturnValue(true)
    keypressService.keydown('a')
    expect(keypressService.selectedKeys).toBe('a')
    keypressService.keyup('b')
    expect(keypressService.selectedKeys).toBe('a')
  })

  test('When you press a key, all keys that have been let go are removed from the selected keys', () => {
    mockedIsValidKeybind.mockReturnValue(true)
    keypressService.keydown('a')
    keypressService.keydown('b')
    expect(keypressService.selectedKeys).toBe('a+b')
    keypressService.keyup('a')
    expect(keypressService.selectedKeys).toBe('a+b')
    keypressService.keydown('c')
    expect(keypressService.selectedKeys).toBe('b+c')
  })
})
