// buttons
var studyButton = document.querySelector("#study-button")
var meditateButton = document.querySelector("#meditate-button")
var exerciseButton = document.querySelector("#exercise-button")
var form = document.querySelector(".inner-activity-container")
var startActivityButton = form.querySelector("#start-activity-button")
var logActivityButton = document.querySelector('#log-activity-button')
var createNewActivityButton = document.querySelector('#create-new-activity-button')
var startTimer = document.querySelector('#start-timer')

// elements that toggle hidden
var mainPage = document.querySelector('.main-page')
var activityTimerModal = document.querySelector('.activity-timer')
var activityFormModal = document.querySelector('.activity-form')
var activityCompletedModal = document.querySelector('.activity-completed')
var buttonsError = document.querySelector('.buttons-error-message')

// global variables
var categorySelected 
var currentActivity
var allActivities = []
var pageColor

studyButton.addEventListener("click", setPageGreen)

meditateButton.addEventListener("click", setPagePurple)

exerciseButton.addEventListener("click", setPageRed)

startActivityButton.addEventListener("click", renderErrorMessages)
startActivityButton.addEventListener("click", submitForm)

startTimer.addEventListener('click', beginTimer)

createNewActivityButton.addEventListener("click", displayNewActivityForm)

function renderErrorMessages() {
  var invalidFields = form.querySelectorAll(":invalid")
  var errorMessages = form.querySelectorAll(".error-message"),
    parent;
  // Remove any existing messages
  for (var i = 0; i < errorMessages.length; i++) {
    errorMessages[i].parentNode.removeChild(errorMessages[i]);
  }
  //Add Button error
  if (!categorySelected) { buttonsError.classList.remove('hidden') }
  if (categorySelected) { buttonsError.classList.add('hidden') }

  // Add errors
  for (var i = 0; i < invalidFields.length; i++) {
    parent = invalidFields[i].parentNode;
    invalidFields[i].validationMessage = invalidFields[i].oninvalid()
    parent.insertAdjacentHTML("beforeend", "<div class='error-message'>" +
      invalidFields[i].validationMessage +
      "</div>");
  }
}

function submitForm(event){
  event.preventDefault()
  if (!(form.checkValidity() && categorySelected)) {return}
  createActivity()
  setupActivityTimerModal()
  displayActivityTimerModal()
}

function createActivity(){
  var activityDescription = document.querySelector('#activity-description').value
  let seconds = parseInt(document.querySelector('#seconds').value)
  let minutes = parseInt(document.querySelector('#minutes').value)
  currentActivity = new Activity(categorySelected, activityDescription, minutes, seconds)
}

function setupActivityTimerModal() {
  var intention = document.querySelector(".intention")
  var timeAmount = document.querySelector(".activity-time-display")
  intention.innerText = currentActivity.description
  timeAmount.innerText = setTimer()
}

function setTimer() {
  let seconds = currentActivity.seconds
  let minutes = currentActivity.minutes
  let newSeconds = (seconds % 60)
  let addMinutes = Math.floor(seconds / 60)
  let newMinutes = (minutes + addMinutes)
  return stringifyTime(newMinutes, newSeconds)
}

function displayActivityTimerModal() {
  activityFormModal.classList.add('hidden')
  activityTimerModal.classList.remove('hidden')
}

function beginTimer(){
  spinTimer(startTimer)
  var timer = document.querySelector('.activity-time-display')
  var minutes = parseInt(timer.innerText.split(':')[0])
  var seconds = parseInt(timer.innerText.split(':')[1])
  
  var countdown = setInterval(function () {
    if (seconds > 0) {
      seconds -= 1
      timer.innerText = stringifyTime(minutes, seconds)
      if (seconds === 0){
        clearInterval(countdown)
        endTimer(startTimer)
      }
    } else {
      minutes -= 1
      seconds = 59
      timer.innerText = stringifyTime(minutes, seconds)
    }
  }, 1000);
}

function spinTimer(timer){
  timer.classList.add('spinning-loader')
  timer.innerText = ('')
}

function endTimer(timer){
  timer.classList.remove('spinning-loader')
  timer.innerText = ('COMPLETE!')
  
  logActivityButton.addEventListener('click', recordActivity)
  logActivityButton.classList.remove('hidden')
}

function recordActivity() {
  currentActivity.markComplete()
  allActivities.push(currentActivity)
  displayPastActivities()
  displayActivityCompletedModal()
  currentActivity = null
}

function displayNewActivityForm() {
  activityCompletedModal.classList.add('hidden')
  activityFormModal.classList.remove('hidden')
  resetActivityForm()
  resetTimer()
}

function displayActivityCompletedModal() {
  activityCompletedModal.classList.remove('hidden')
  activityTimerModal.classList.add('hidden')
}

function displayPastActivities(){
  noActivitiesReminder = document.querySelector('.no-activities')
  noActivitiesReminder.classList.add('hidden')
  renderPastActivities()
}

function renderPastActivities() {
  pastActivities = document.querySelector('.past-activities-container')
    html = `
    <div class="past-activity ${currentActivity.category}" id="${currentActivity.id}">
      <h5>${currentActivity.category}</h5>
      <h6>${currentActivity.minutes} MIN ${currentActivity.seconds} SECONDS</h6>
      <div class="color-line"></div>
      <p>${currentActivity.description}</p>
    </div>
    `
  pastActivities.innerHTML += html
}

function stringifyTime(minutes, seconds) {
  let paddedMinutes = minutes.toString().length === 1 ? '0' + minutes.toString() : minutes.toString()
  let paddedSeconds = seconds.toString().length === 1 ? '0' + seconds.toString() : seconds.toString()
  return paddedMinutes + ':' + paddedSeconds
}

function resetTimer(){
  startTimer.innerText = 'START'
  logActivityButton.classList.add('hidden')
}

function resetActivityForm() {
  pageColor = ''
  categorySelected = null
  document.querySelector('#activity-description').value = ''
  document.querySelector('#minutes').value = null
  document.querySelector('#seconds').value = null
  mainPage.classList.remove('green')
  mainPage.classList.remove('red')
  mainPage.classList.remove('purple')
}

function setPageGreen(event) {
  event.preventDefault()
  categorySelected = 'Study'
  pageColor = 'green'
  mainPage.classList.add("green")
  mainPage.classList.remove("purple")
  mainPage.classList.remove("red")
}

function setPagePurple(event) {
  event.preventDefault()
  categorySelected = 'Meditate'
  pageColor = 'purple'
  mainPage.classList.add("purple")
  mainPage.classList.remove("red")
  mainPage.classList.remove("green")
}

function setPageRed(event) {
  event.preventDefault()
  categorySelected = 'Exercise'
  pageColor = 'red'
  mainPage.classList.add("red")
  mainPage.classList.remove("green")
  mainPage.classList.remove("purple")
}
