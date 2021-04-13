class Activity {
  constructor(category, description, minutes, seconds) {
    this.category = category
    this.description = description

    let newSeconds = (seconds % 60)
    let addMinutes = Math.floor(seconds / 60)
    let newMinutes = (minutes + addMinutes)

    this.secondsRemaining = newSeconds
    this.minutesRemaining = newMinutes
    this.minutes = newMinutes
    this.seconds = newSeconds
    this.id = Date.now()
    this.completed = false
  }

  markComplete() {
    this.completed = true
  }

  displayTime() {
    if(this.seconds === 0){
      return `${this.minutes} MIN`
    } else if (this.minutes === 0){
      return `${this.seconds} SECONDS`
    } else {
      return `${this.minutes} MIN ${this.seconds} SECONDS`
    }
  }

  countdown() {
    if (this.secondsRemaining > 0) {
      this.secondsRemaining -= 1
    } else {
      this.minutesRemaining -= 1
      this.secondsRemaining = 59
    }
  }

  isCompleted(){
    return this.minutesRemaining === 0 && this.secondsRemaining === 0
  }

  saveToStorage(allActivities) {
    debugger
    allActivities.push(this)
    debugger
    localStorage.setItem('allActivities', JSON.stringify(allActivities))
  }
}
