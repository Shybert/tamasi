import {ipcRenderer} from 'electron'

export default class Logger {
  public async log (text: string) {
    this.sendToMain(text, 'log')
  }

  public async error (text: string) {
    this.sendToMain(text, 'error')
  }

  private async sendToMain (text: string, level: string) {
    ipcRenderer.send('LOGGER', text, level)
  }
}
