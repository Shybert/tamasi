export default class KeypressService {
  private pressedKeys: string[] = []
  private selectedKeysArray: string[] = []

  get selectedKeys (): string {
    return this.selectedKeysArray.join('+')
  }

  keydown (key: string): void {
    if (this.pressedKeys.includes(key)) return
    // Remove keys that have been let go (from keyup)
    this.selectedKeysArray = this.selectedKeysArray.filter(selectedKey => this.pressedKeys.includes(selectedKey))

    this.pressedKeys.push(key)
    this.selectedKeysArray.push(key)
  }
  keyup (key: string): void {
    this.pressedKeys = this.pressedKeys.filter(pressedKey => pressedKey !== key)
  }

  reset (): void {
    this.pressedKeys = []
    this.selectedKeysArray = []
  }
}
