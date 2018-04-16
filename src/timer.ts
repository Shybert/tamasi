/* eslint-disable no-undef */
import * as saves from './storage/saves'

class Timer {
  private interval: any
  private currentTime: number
  private milliseconds: number = 0
  private timeSinceLastSave: number

  public async switch (timeElement: HTMLElement, gameId: string, saveId: string, bossId: string) {
    if (!this.interval) {
      console.log('Starting timer, timer element:', timeElement)

      // Get current time to calculate time differences
      this.currentTime = Date.now()
      this.timeSinceLastSave = Date.now()
      // Set elapsed milliseconds to currently saved time
      this.milliseconds = await saves.getBossTimer(gameId, saveId, bossId)

      // Using arrow function to get around the setInterval 'this' problem
      this.interval = setInterval(() => this.timer(timeElement, gameId, saveId, bossId), 50)
    } else if (this.interval) {
      console.log('Stopping timer')
      clearInterval(this.interval)
      saves.increaseTime(gameId, saveId, bossId, this.milliseconds)
      console.log('Total elapsed time:', this.milliseconds)
      this.reset()
    }
  }

  private timer (timeElement: HTMLElement, gameId: string, saveId: string, bossId: string) {
    // Add the number of milliseconds since the last iteration using the system clock
    // to prevent the timer getting out of sync
    this.milliseconds += Date.now() - this.currentTime
    // Display new time on the element
    timeElement.innerHTML = `Time: ${this.milliseconds}`
    console.log('Currently elapsed time:', this.milliseconds)

    // Check time since last save
    if (Date.now() - this.timeSinceLastSave > 5000) {
      this.timeSinceLastSave = Date.now()
      saves.increaseTime(gameId, saveId, bossId, this.milliseconds)
    }

    // Get new currentTime
    this.currentTime = Date.now()
  }

  private reset () {
    console.log('Resetting timer')
    // Set all variables back to their default value
    this.interval = undefined
    this.currentTime = undefined
    this.milliseconds = 0
    this.timeSinceLastSave = 0
  }
}

export {Timer}
