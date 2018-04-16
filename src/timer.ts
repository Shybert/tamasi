/* eslint-disable no-undef */
import * as saves from './storage/saves'

class Timer {
  // Required properties
  private gameId: string
  private saveId: string
  constructor (gameId: string, saveId: string) {
    this.gameId = gameId
    this.saveId = saveId
  }

  private interval: any
  private currentTime: number
  private milliseconds: number = 0
  private timeSinceLastSave: number

  public async switch (timeElement: HTMLElement, bossId: string) {
    if (!this.interval) {
      console.log('Starting timer, timer element:', timeElement)

      // Get current time to calculate time differences
      this.currentTime = Date.now()
      this.timeSinceLastSave = Date.now() // RENAME PLZ
      // Set elapsed milliseconds to currently saved time
      this.milliseconds = await saves.getBossTimer(this.gameId, this.saveId, bossId)

      // Using arrow function to get around the setInterval 'this' problem
      this.interval = setInterval(() => this.timer(timeElement, bossId), 50)
    } else if (this.interval) {
      this.stop(bossId)
    }
  }

  private timer (timeElement: HTMLElement, bossId: string) {
    // Add the number of milliseconds since the last iteration using the system clock
    // to prevent the timer getting out of sync
    this.milliseconds += Date.now() - this.currentTime
    // Display new time on the element
    timeElement.innerHTML = `Time: ${this.milliseconds}`
    console.log('Currently elapsed time:', this.milliseconds)

    // Check time since last save
    if (Date.now() - this.timeSinceLastSave > 5000) {
      this.timeSinceLastSave = Date.now()
      saves.increaseTime(this.gameId, this.saveId, bossId, this.milliseconds)
    }

    // Get new currentTime
    this.currentTime = Date.now()
  }

  public async stop (bossId: string) {
    try {
      console.log('Stopping timer')
      clearInterval(this.interval)
      saves.increaseTime(this.gameId, this.saveId, bossId, this.milliseconds)
      console.log('Total elapsed time:', this.milliseconds)
      this.reset()
    } catch (err) {
      console.error('Error while stopping timer:', err)
    }
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
