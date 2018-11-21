import {EventEmitter} from 'events'

export default class Timer extends EventEmitter {
  private interval: number | undefined
  private previousIntervalTime: number | undefined
  private elapsedMilliseconds: number = 0

  public isRunning (): boolean {
    return Boolean(this.interval)
  }

  public start (startTime: number): void {
    console.log('Starting timer')

    // Initialize previous interval time with current time to calculate time differences
    this.previousIntervalTime = Date.now()
    this.elapsedMilliseconds = startTime

    this.interval = window.setInterval(() => this.timer(), 50)
  }

  public stop (): void {
    // Check if timer is running first
    if (this.isRunning()) {
      console.log('Stopping timer')
      clearInterval(this.interval)
      this.reset()
    } else {
      console.log('Not stopping timer because it is not running')
    }
  }

  public switch (startTime?: number): void {
    if (this.isRunning()) {
      this.stop()
    } else {
      if (typeof startTime === 'undefined') throw new Error('Start time must be provided when starting the timer!')
      this.start(startTime)
    }
  }

  private timer (): void {
    /* Add the number of milliseconds since the last iteration using the system clock
    to prevent the timer getting out of sync */
    this.elapsedMilliseconds += Date.now() - this.previousIntervalTime!
    console.log('Currently elapsed time:', this.elapsedMilliseconds)

    this.emit('tick', this.elapsedMilliseconds)

    // Set a new previous time for use in the next interval
    this.previousIntervalTime = Date.now()
  }

  private reset (): void {
    console.log('Resetting timer')
    // Set all variables back to their default value
    this.interval = undefined
    this.previousIntervalTime = undefined
    this.elapsedMilliseconds = 0
  }
}
