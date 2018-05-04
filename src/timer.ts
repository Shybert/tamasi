/* eslint-disable no-undef */
import * as saves from './storage/saves'
import * as display from './display/display'

class Timer {
  // Required properties
  private gameId: string
  private saveId: string
  private saves: saves.Saves
  constructor (theGameId: string, theSaveId: string) {
    this.gameId = theGameId
    this.saveId = theSaveId

    // Initialize saves class
    this.saves = new saves.Saves(this.gameId, this.saveId)
  }

  private interval: any
  private previousIntervalTime: number
  private previousSaveTime: number
  private milliseconds: number = 0

  public async switch (timeElement: HTMLElement, bossId: string): Promise<void> {
    try {
      if (!this.interval) {
        console.log('Starting timer, timer element:', timeElement)

        // Get current time to calculate time differences
        this.previousIntervalTime = Date.now()
        this.previousSaveTime = Date.now()
        // Set elapsed milliseconds to currently saved time
        this.milliseconds = await this.saves.getBossTime(bossId)

        // Using arrow function to get around the setInterval 'this' problem
        this.interval = setInterval(() => this.timer(timeElement, bossId), 50)
      } else if (this.interval) {
        this.stop(bossId)
      }
    } catch (err) {
      console.error('Error while switching timer:', err)
    }
  }

  private async timer (timeElement: HTMLElement, bossId: string): Promise<void> {
    try {
      /* Add the number of milliseconds since the last iteration using the system clock
      to prevent the timer getting out of sync */
      this.milliseconds += Date.now() - this.previousIntervalTime
      // Display new time on the element
      const formattedTime: string = await display.formatTime(this.milliseconds)
      timeElement.innerHTML = `Time: ${formattedTime}`
      console.log('Currently elapsed time:', this.milliseconds)

      // Compare current time to last save time
      if (Date.now() - this.previousSaveTime > 10000) {
        this.previousSaveTime = Date.now()
        this.saves.setBossTime(bossId, this.milliseconds)
      }

      // Set a new previous time for use in the next interval
      this.previousIntervalTime = Date.now()
    } catch (err) {
      console.error('Error while running timer:', err)
    }
  }

  public async stop (bossId: string): Promise<void> {
    try {
      // Check if timer is running first
      if (this.interval) {
        console.log('Stopping timer')
        clearInterval(this.interval)
        this.saves.setBossTime(bossId, this.milliseconds)
        console.log('Total elapsed time:', this.milliseconds)
        this.reset()
      } else {
        console.log('Not stopping timer as it is not running')
      }
    } catch (err) {
      console.error('Error while stopping timer:', err)
    }
  }

  private async reset (): Promise<void> {
    try {
      console.log('Resetting timer')
      // Set all variables back to their default value
      this.interval = undefined
      this.previousIntervalTime = undefined
      this.previousSaveTime = undefined
      this.milliseconds = 0
    } catch (err) {
      console.error('Error while resetting timer:', err)
    }
  }
}

export {Timer}
