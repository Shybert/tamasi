/* eslint-disable no-undef */

class Timer {
  private interval: any
  private milliseconds: number = 0

  public switch (timeElement: HTMLElement) {
    if (!this.interval) {
      console.log('Starting timer, timer element:', timeElement)
      // Using arrow function to get around the setInterval 'this' problem
      this.interval = setInterval(() => this.timer(timeElement), 1000)
    } else if (this.interval) {
      console.log('Stopping timer')
      clearInterval(this.interval)
      console.log('Total elapsed time:', this.milliseconds)
      this.reset()
    }
  }

  private timer (timeElement: HTMLElement) {
    this.milliseconds += 1
    // Display new time on the element
    timeElement.innerHTML = `Time: ${this.milliseconds}`
    console.log('Currently elapsed time:', this.milliseconds)
  }

  private reset () {
    console.log('Resetting timer')
    // Set all variables back to their default value
    this.interval = undefined
    this.milliseconds = 0
  }
}

export {Timer}
