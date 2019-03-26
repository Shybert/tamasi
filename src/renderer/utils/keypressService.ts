export default class KeypressService {
  private pressedKeys: string[] = []
  private selectedKeys: string[] = []

  get keybind (): string {
    return this.selectedKeys.join('+')
  }

  public keydown (key: KeyboardEvent): void {
    if (key.repeat) return

    // Remove keys that have been let go (from keyup)
    this.selectedKeys = this.selectedKeys.filter(selectedKey => this.pressedKeys.includes(selectedKey))

    this.pressedKeys.push(key.key)
    this.selectedKeys.push(key.key)
  }

  public keyup (key: KeyboardEvent): void {
    this.pressedKeys = this.pressedKeys.filter(pressedKey => pressedKey !== key.key)
  }

  reset (): void {
    this.pressedKeys = []
    this.selectedKeys = []
  }
}
