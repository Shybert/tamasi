import * as acceleratorHelpers from './acceleratorHelpers'

export default class KeypressService {
  private pressedKeys: string[] = []
  private selectedKeysArray: string[] = []

  get selectedKeys (): string {
    return this.selectedKeysArray.join('+')
  }

  keydown (key: string): void {
    // Remove keys that have been let go (from keyup)
    this.selectedKeysArray = this.selectedKeysArray.filter(selectedKey => this.pressedKeys.includes(selectedKey))

    if (!acceleratorHelpers.isValidKeybind(key)) return
    this.pressedKeys.push(key)
    this.selectedKeysArray.push(key)
  }
  keyup (key: string): void {
    this.pressedKeys = this.pressedKeys.filter(pressedKey => pressedKey !== key)
  }
}
