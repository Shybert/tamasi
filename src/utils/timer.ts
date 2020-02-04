import { EventEmitter } from 'events'

export default class Timer extends EventEmitter {
  private interval: number | undefined
  private previousTime: number | undefined

  public isRunning(): boolean {
    return Boolean(this.interval)
  }

  public start(): void {
    // Initialize previous interval time with current time to calculate time differences
    this.previousTime = Date.now()

    this.interval = window.setInterval(() => this.timer(), 50)
  }

  public stop(): void {
    if (this.isRunning()) {
      clearInterval(this.interval)
      this.reset()
    }
  }

  public toggle(): void {
    this.isRunning() ? this.stop() : this.start()
  }

  private timer(): void {
    /* Add the number of milliseconds since the last iteration using the system clock
    to prevent the timer getting out of sync */
    const elapsedMilliseconds = Date.now() - this.previousTime!
    this.emit('tick', elapsedMilliseconds)

    // Set a new previous time for use in the next interval
    this.previousTime = Date.now()
  }

  private reset(): void {
    this.interval = undefined
    this.previousTime = undefined
  }
}
