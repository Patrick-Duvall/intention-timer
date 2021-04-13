// buttons
var studyButton = document.querySelector("#study-button")
var meditateButton = document.querySelector("#meditate-button")
var exerciseButton = document.querySelector("#exercise-button")
var form = document.querySelector(".inner-activity-container")
var startActivityButton = form.querySelector("#start-activity-button")
var logActivityButton = document.querySelector('#log-activity-button')
var createActivityButton = document.querySelector('#create-activity-button')

// elements that toggle hidden
var mainPage = document.querySelector('.main-page')
var activityTimerModal = document.querySelector('.activity-timer-modal')
var activityFormModal = document.querySelector('.activity-form-modal')
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
  showActivityTimerModal()
}

function createActivity(){
  var activityDescription = document.querySelector('#activity-description').value
  let seconds = parseInt(document.querySelector('#seconds').value)
  let minutes = parseInt(document.querySelector('#minutes').value)
  currentActivity = new Activity(categorySelected, activityDescription, minutes, seconds)
}

function setupActivityTimerModal() {
  var intention = document.querySelector(".intention")
  var timeAmount = document.querySelector(".activity-timer")
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

function showActivityTimerModal() {
  activityFormModal.classList.add('hidden')
  activityTimerModal.classList.remove('hidden')
}

var startTimer = document.querySelector('#start-timer')
startTimer.addEventListener('click', beginTimer)

function beginTimer(){
  spinTimer(startTimer)
  var timer = document.querySelector('.activity-timer')
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
  displayCompletedActivityModal()
  currentActivity = null
}

function displayCompletedActivityModal() {
  document.querySelector('.completed-activity-modal').classList.remove('hidden')
  document.querySelector('.activity-timer-modal').classList.add('hidden')
}

function displayPastActivities(){
  noActivitiesReminder = document.querySelector('.no-activities')
  noActivitiesReminder.classList.add('hidden')
  renderPastActivities()
}

function renderPastActivities() {
  pastActivities = document.querySelector('.past-activities-container')
  html = ''
  for (let i = 0; i < allActivities.length; i++) {
    activity = allActivities[i]
    html += `
    <div class="past-activity ${activity.type}" id="${activity.id}">
      <h3>${activity.category}</h3>
      <p>${activity.description}</p>
      <p>${activity.minutes} MIN ${activity.seconds} SECONDS</p>
      </div>
    `
  }
  pastActivities.innerHTML += html
}

function stringifyTime(minutes, seconds) {
  let paddedMinutes = minutes.toString().length === 1 ? '0' + minutes.toString() : minutes.toString()
  let paddedSeconds = seconds.toString().length === 1 ? '0' + seconds.toString() : seconds.toString()
  return paddedMinutes + ':' + paddedSeconds
}

function setPageGreen(event) {
  event.preventDefault()
  categorySelected = 'study'
  pageColor = 'green'
  mainPage.classList.add("green")
  mainPage.classList.remove("purple")
  mainPage.classList.remove("red")
}

function setPagePurple(event) {
  event.preventDefault()
  categorySelected = 'meditate'
  pageColor = 'purple'
  mainPage.classList.add("purple")
  mainPage.classList.remove("red")
  mainPage.classList.remove("green")
}

function setPageRed(event) {
  event.preventDefault()
  categorySelected = 'exercise'
  pageColor = 'red'
  mainPage.classList.add("red")
  mainPage.classList.remove("green")
  mainPage.classList.remove("purple")
}
