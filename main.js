// buttons
var studyButton = document.querySelector("#study-button")
var meditateButton = document.querySelector("#meditate-button")
var exerciseButton = document.querySelector("#exercise-button")
var form = document.querySelector(".inner-activity-container")
var startActivityButton = form.querySelector("#start-activity-button")
var logActivityButton = document.querySelector('#log-activity-button')
var createNewActivityButton = document.querySelector('#create-new-activity-button')
var stopWatch = document.querySelector('#start-timer')

// elements that toggle hidden
var mainPage = document.querySelector('.main-page')
var activityTimerModal = document.querySelector('.activity-timer')
var activityFormModal = document.querySelector('.activity-form')
var activityCompletedModal = document.querySelector('.activity-completed')
var buttonsError = document.querySelector('.buttons-error-message')

// global variables
var categorySelected 
var currentActivity
// var activities = []
var pageColor

studyButton.addEventListener("click", setPageGreen)

meditateButton.addEventListener("click", setPagePurple)

exerciseButton.addEventListener("click", setPageRed)

startActivityButton.addEventListener("click", renderErrorMessages)
startActivityButton.addEventListener("click", submitForm)

stopWatch.addEventListener('click', beginTimer)

createNewActivityButton.addEventListener("click", displayNewActivityForm)

window.onload = function () {
  allActivities = JSON.parse(localStorage.getItem('allActivities')); //get data from storage
  if (allActivities !== null) { //if data exist (todos are in storage)
    displayPastActivities()
  } else { //if nothing exist in storage, keep todos array empty
    allActivities = [];
  }
}

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
  timeAmount.innerText = stringifyTime(currentActivity.minutes, currentActivity.seconds)
}

function displayActivityTimerModal() {
  activityFormModal.classList.add('hidden')
  activityTimerModal.classList.remove('hidden')
}

function beginTimer(){
  if(stopWatch.classList.contains('clicked')) return
  stopWatch.classList.add('clicked')
  var timeDisplay = document.querySelector('.activity-time-display')

  updateClock = setInterval(function () { 
    currentActivity.countdown()
    if (currentActivity.isCompleted()){
      clearInterval(updateClock)
      endTimer(stopWatch)
    }
    timeDisplay.innerText = stringifyTime(currentActivity.minutesRemaining, currentActivity.secondsRemaining)
  }, 1000);

  spinTimer(stopWatch)
}

function stringifyTime(minutes, seconds) {
  let paddedMinutes = minutes.toString().length === 1 ? '0' + minutes.toString() : minutes.toString()
  let paddedSeconds = seconds.toString().length === 1 ? '0' + seconds.toString() : seconds.toString()
  return paddedMinutes + ':' + paddedSeconds
}

function spinTimer(timer){
  timer.classList.add('spinning-loader')
  timer.innerText = ('PAUSE')
  timer.addEventListener('click', pauseTimer)
}

function pauseTimer() {
  stopWatch.classList.remove('spinning-loader')
  stopWatch.classList.remove('clicked')
  stopWatch.innerText = ('START')
  clearInterval(updateClock)
}

function endTimer(timer){
  timer.classList.remove('spinning-loader')
  timer.classList.add('clicked')
  timer.innerText = ('COMPLETE!')
  stopWatch.removeEventListener('click', pauseTimer)
  
  logActivityButton.addEventListener('click', recordActivity)
  logActivityButton.classList.remove('hidden')
}

function recordActivity() {
  currentActivity.markComplete()
  currentActivity.saveToStorage(allActivities)
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
  pastActivities = document.querySelector('.all-activities')
  html = ''
  for(let i = 0; i < allActivities.length; i++){
    activity = new Activity(allActivities[i].category,
      allActivities[i].description,
      allActivities[i].minutes,
      allActivities[i].seconds
      )
    html += `
    <div class="past-activity ${activity.category}" id="${activity.id}">
      <h5>${activity.category}</h5>
      <h6>${activity.displayTime()}</h6>
      <div class="color-line"></div>
      <p>${activity.description}</p>
    </div>
    `
  }
  pastActivities.innerHTML = html
}

function resetTimer(){
  stopWatch.innerText = 'START'
  stopWatch.classList.remove('clicked')
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
