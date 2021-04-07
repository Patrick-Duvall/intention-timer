var studyButton = document.querySelector("#study-button")
var meditateButton = document.querySelector("#meditate-button")
var exerciseButton = document.querySelector("#exercise-button")
var categorySelected = false
var pageColor = ''
var mainPage = document.querySelector('.main-page')
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
  debugger
});

submitButton.addEventListener("click", submitForm)

function submitForm(event){
  if (!(form.checkValidity() && categorySelected)) {return}
  debugger
  event.preventDefault()
  document.querySelector('#seconds').value
  document.querySelector('#minutes').value
  document.querySelector('#to-accomplish').value
  activityContainer = document.querySelector('.activity-container')
  currentActivityContainer = document.querySelector('.current-activity-container')
  activityContainer.classList.add('hidden')
  currentActivityContainer.classList.remove('hidden')
  debugger
}


function setFormGreen() {
  categorySelected = 'study'
  pageColor = 'green'
  mainPage.classList.add("green")
  mainPage.classList.remove("purple")
  mainPage.classList.remove("red")
}

function setFormPurple() {
  categorySelected = 'meditate'
  pageColor = 'purple'
  mainPage.classList.add("purple")
  mainPage.classList.remove("red")
  mainPage.classList.remove("green")
}

function setFormRed() {
  categorySelected = 'exercise'
  pageColor = 'red'
  mainPage.classList.add("red")
  mainPage.classList.remove("green")
  mainPage.classList.remove("purple")
}
