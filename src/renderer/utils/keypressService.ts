import * as acceleratorHelpers from './acceleratorHelpers'

export default class KeypressService {
  private pressedKeys: string[] = []
  private selectedKeysArray: string[] = []

  errorMessage: string | null = null
  private validateInput (key: string): boolean {
    const hasKey: boolean = this.selectedKeysArray.some(selectedKey => acceleratorHelpers.isValidKey(selectedKey))

    if (acceleratorHelpers.isModifier(key)) {
      if (!hasKey) this.errorMessage = 'A keybind can not consist solely of modifiers.'
      return true
    }

    if (hasKey) {
      this.errorMessage = 'There can only be a single key (and multiple modifiers).'
      return false
    }

    if (acceleratorHelpers.isValidKey(key)) return true

    this.errorMessage = `The key '${key}' is not a valid key/modifier.`
    return false
  }

  get selectedKeys (): string {
    return this.selectedKeysArray.join('+')
  }

  keydown (key: string): void {
    if (this.pressedKeys.includes(key)) return
    this.errorMessage = null
    // Remove keys that have been let go (from keyup)
    this.selectedKeysArray = this.selectedKeysArray.filter(selectedKey => this.pressedKeys.includes(selectedKey))

    if (!this.validateInput(key)) return

    this.pressedKeys.push(key)
    this.selectedKeysArray.push(key)
  }
  keyup (key: string): void {
    this.pressedKeys = this.pressedKeys.filter(pressedKey => pressedKey !== key)
  }

  reset (): void {
    this.pressedKeys = []
    this.selectedKeysArray = []
    this.errorMessage = null
  }
}
