import {ISaveInfo} from './storage/saves'

class Timer {
  private interval: NodeJS.Timer | undefined
  private previousIntervalTime: number | undefined
  private milliseconds: number = 0

  public async start (saveInfo: ISaveInfo, bossId: string): Promise<void> {
    console.log('Starting timer')

    // Initialize previous interval time with current time to calculate time differences
    this.previousIntervalTime = Date.now()
    // Set milliseconds to current boss time
    this.milliseconds = saveInfo.bosses[bossId].time

    this.interval = setInterval(() => this.timer(saveInfo, bossId), 50)
  }

  public async stop (): Promise<void> {
    try {
      // Check if timer is running first
      if (this.interval) {
        console.log('Stopping timer')
        clearInterval(this.interval)
        this.reset()
      } else {
        console.log('Not stopping timer because it is not running')
      }
    } catch (err) {
      console.error('Error while stopping timer:', err)
    }
  }

  public async switch (saveInfo?: ISaveInfo, bossId?: string): Promise<void> {
    try {
      if (this.interval) {
        this.stop()
      } else {
        if (!saveInfo) throw new Error('Save info must be provided when starting the timer')
        if (!bossId) throw new Error('Boss ID must be provided when starting the timer')
        this.start(saveInfo, bossId)
      }
    } catch (err) {
      console.error('Error while switching timer:', err)
    }
  }

  private async timer (saveInfo: ISaveInfo, bossId: string): Promise<void> {
    try {
      /* Add the number of milliseconds since the last iteration using the system clock
      to prevent the timer getting out of sync */
      this.milliseconds += Date.now() - this.previousIntervalTime!

      saveInfo.bosses[bossId].time = this.milliseconds
      console.log('Currently elapsed time:', this.milliseconds)

      // Set a new previous time for use in the next interval
      this.previousIntervalTime = Date.now()
    } catch (err) {
      console.error('Error while running timer:', err)
    }
  }

  private async reset (): Promise<void> {
    try {
      console.log('Resetting timer')
      // Set all variables back to their default value
      this.interval = undefined
      this.previousIntervalTime = undefined
      this.milliseconds = 0
    } catch (err) {
      console.error('Error while resetting timer:', err)
    }
  }
}

export {Timer}
