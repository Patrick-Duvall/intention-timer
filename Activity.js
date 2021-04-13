class Activity {
  constructor(category, description, minutes, seconds) {
    this.category = category
    this.description = description
    this.minutes = minutes
    this.seconds = seconds
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

  }

  saveToStorage() {
    
  }
}
