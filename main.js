var studyButton = document.querySelector("#study-button")
var meditateButton = document.querySelector("#meditate-button")
var exerciseButton = document.querySelector("#exercise-button")
var categorySelected = false
var pageColor = ''
var mainPage = document.querySelector('.main-page')
var activityTimerModal = document.querySelector('.activity-timer-modal')
var activityFormModal = document.querySelector('.activity-form-modal')
var buttonsError = document.querySelector('.buttons-error-message')

studyButton.addEventListener("click", setPageGreen)
meditateButton.addEventListener("click", setPagePurple)
exerciseButton.addEventListener("click", setPageRed)

form = document.querySelector(".inner-activity-container")

var submitButton = form.querySelector("#start")
submitButton.addEventListener("click", renderErrorMessages)

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

submitButton.addEventListener("click", submitForm)

function submitForm(event){
  event.preventDefault()
  if (!(form.checkValidity() && categorySelected)) {return}
  setupActivityTimerModal()
  showActivityTimerModal()
}

function setupActivityTimerModal() {
  var activityDescription = document.querySelector('#activity-description').value
  var intention = document.querySelector(".intention")
  var timeAmount = document.querySelector(".activity-timer")
  intention.innerText = activityDescription
  timeAmount.innerText = setTimer()
}

function setTimer() {
  let seconds = parseInt(document.querySelector('#seconds').value)
  let minutes = parseInt(document.querySelector('#minutes').value)
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
  var timer = document.querySelector('.activity-timer')
  var minutes = parseInt(timer.innerText.split(':')[0])
  var seconds = parseInt(timer.innerText.split(':')[1])
  
  var countdown = setInterval(function () {
    if (minutes === 0 && seconds === 0 ){
      clearInterval(countdown)
    } else if (seconds > 0) {
      seconds -= 1
      timer.innerText = stringifyTime(minutes, seconds)
    } else {
      minutes -= 1
      seconds = 59
      timer.innerText = stringifyTime(minutes, seconds)
    }
  }, 1000);
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
