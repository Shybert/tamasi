/* eslint-disable no-undef */

class Timer {
  private interval: any
  private currentTime: number
  private milliseconds: number = 0

  public switch (timeElement: HTMLElement) {
    if (!this.interval) {
      console.log('Starting timer, timer element:', timeElement)

      // Get current time to calculate time difference in function
      this.currentTime = Date.now()
      // Using arrow function to get around the setInterval 'this' problem
      this.interval = setInterval(() => this.timer(timeElement), 50)
    } else if (this.interval) {
      console.log('Stopping timer')
      clearInterval(this.interval)
      console.log('Total elapsed time:', this.milliseconds)
      this.reset()
    }
  }

  private timer (timeElement: HTMLElement) {
    // Add the number of milliseconds since the last iteration using the system clock
    // to prevent the timer getting out of sync
    this.milliseconds += Date.now() - this.currentTime
    // Display new time on the element
    timeElement.innerHTML = `Time: ${this.milliseconds}`
    console.log('Currently elapsed time:', this.milliseconds)

    // Get new currentTime
    this.currentTime = Date.now()
  }

  private reset () {
    console.log('Resetting timer')
    // Set all variables back to their default value
    this.interval = undefined
    this.milliseconds = 0
  }
}

export {Timer}
