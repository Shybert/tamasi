import dateFormat from 'dateformat'
import * as path from 'path'
import * as fs from 'fs-extra'
import {app} from 'electron'

export default class Logger {
  private bar: string = '='.repeat(80)
  private logTimeFormat: string = 'yyyy-mm-dd HH:MM'
  private logsPath: string
  private stream: fs.WriteStream
  constructor () {
    const currentTime: string = dateFormat(new Date(), 'yyyy-mm-dd_HH_MM_ss')
    this.logsPath = path.join(app.getPath('userData'), 'logs', `${currentTime}.txt`)
    // Using sync method to make sure file exists before creating the write stream
    fs.ensureFileSync(this.logsPath)
    this.stream = fs.createWriteStream(this.logsPath)

    console.log(`${this.bar}\nProgram started at ${dateFormat(new Date(), this.logTimeFormat)}\n`)
    this.stream.write(`${this.bar}\nProgram started at ${dateFormat(new Date(), this.logTimeFormat)}\n\n`)
  }

  public async log (text: string) {
    console.log(`[${dateFormat(new Date(), this.logTimeFormat)}] ${text}`)
    this.stream.write(`[${dateFormat(new Date(), this.logTimeFormat)}] ${text}\n`)
  }
}
