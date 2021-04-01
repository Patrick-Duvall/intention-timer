var studyButton = document.querySelector("#study-button")
var meditateButton = document.querySelector("#meditate-button")
var exerciseButton = document.querySelector("#exercise-button")
var mainPage = document.querySelector('.main-page')

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

function setFormGreen() {
  mainPage.classList.add("green")
  mainPage.classList.remove("purple")
  mainPage.classList.remove("red")
}

function setFormPurple() {
  mainPage.classList.add("purple")
  mainPage.classList.remove("red")
  mainPage.classList.remove("green")
}

function setFormRed() {
  mainPage.classList.add("red")
  mainPage.classList.remove("green")
  mainPage.classList.remove("purple")
}
