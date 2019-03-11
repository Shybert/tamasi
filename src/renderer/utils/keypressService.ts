import {ipcRenderer} from 'electron'
import {isValidKey} from './keymap'

export default class KeypressService {
  private pressedKeys: number[] = []
  public selectedKeys: number[] = []
  public errorMessage: string | null = null

  constructor () {
    ipcRenderer.on('keydown', (event: Event, rawcode: number) => this.keydown(rawcode))
    ipcRenderer.on('keyup', (event: Event, rawcode: number) => this.keyup(rawcode))
  }

  private keydown (key: number): void {
    this.errorMessage = null
    if (!isValidKey(key)) {
      this.errorMessage = 'Invalid key.'
      return
    }
    if (this.pressedKeys.includes(key)) return

    // Remove keys that have been let go (from keyup)
    this.selectedKeys = this.selectedKeys.filter(selectedKey => this.pressedKeys.includes(selectedKey))

    this.pressedKeys.push(key)
    this.selectedKeys.push(key)
  }
  private keyup (key: number): void {
    this.pressedKeys = this.pressedKeys.filter(pressedKey => pressedKey !== key)
  }

  reset (): void {
    this.pressedKeys = []
    this.selectedKeys = []
    this.errorMessage = null
  }
}
