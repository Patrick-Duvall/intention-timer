var studyButton = document.querySelector("#study-button")
var meditateButton = document.querySelector("#meditate-button")
var exerciseButton = document.querySelector("#exercise-button")
var categorySelected = false
var pageColor = ''
var mainPage = document.querySelector('.main-page')
var activityTimerModal = document.querySelector('.activity-timer-modal')
var activityFormModal = document.querySelector('.activity-form-modal')
var buttonsError = document.querySelector('.buttons-error-message')

studyButton.addEventListener("click", setFormGreen)
meditateButton.addEventListener("click", setFormPurple)
exerciseButton.addEventListener("click", setFormRed)

form = document.querySelector(".inner-activity-container")
form.addEventListener("invalid", function (event) {
  event.preventDefault();
  }, true
)


var submitButton = form.querySelector("#start")
submitButton.addEventListener("click", function () {
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
  // If there are errors, give focus to the first invalid field
  if (invalidFields.length > 0) {
    invalidFields[0].focus();
  }
});

submitButton.addEventListener("click", submitForm)

function submitForm(event){
  if (!(form.checkValidity() && categorySelected)) {return}
  event.preventDefault()
  setupActivityTimerModal()
  showActivityTimerModal()
}

function setupActivityTimerModal() {
  var toAccomplish = document.querySelector('#to-accomplish').value
  var intention = document.querySelector(".intention")
  var timeAmount = document.querySelector(".activity-time")
  intention.innerText = toAccomplish
  timeAmount.innerText = setTimer()
}

function setTimer() {
  var seconds = parseInt(document.querySelector('#seconds').value)
  var minutes = parseInt(document.querySelector('#minutes').value)
  var newSeconds = (seconds % 60).toString()
  newSeconds = newSeconds.length === 1 ? '0' + newSeconds : newSeconds
  var addMinutes = Math.floor(seconds / 60)
  var newMinutes = (minutes + addMinutes).toString()
  newMinutes = newMinutes.length === 1 ? '0' + newMinutes : newMinutes
  return newMinutes.toString() + ":" + newSeconds.toString()
}

function showActivityTimerModal() {
  activityFormModal.classList.add('hidden')
  activityTimerModal.classList.remove('hidden')
}


function setFormGreen(event) {
  event.preventDefault()
  categorySelected = 'study'
  pageColor = 'green'
  mainPage.classList.add("green")
  mainPage.classList.remove("purple")
  mainPage.classList.remove("red")
}

function setFormPurple(event) {
  event.preventDefault()
  categorySelected = 'meditate'
  pageColor = 'purple'
  mainPage.classList.add("purple")
  mainPage.classList.remove("red")
  mainPage.classList.remove("green")
}

function setFormRed(event) {
  event.preventDefault()
  categorySelected = 'exercise'
  pageColor = 'red'
  mainPage.classList.add("red")
  mainPage.classList.remove("green")
  mainPage.classList.remove("purple")
}
