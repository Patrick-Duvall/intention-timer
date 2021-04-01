var studyButton = document.querySelector("#study-button")
var meditateButton = document.querySelector("#meditate-button")
var exerciseButton = document.querySelector("#exercise-button")

studyButton.addEventListener("click", colorStudyButton)
meditateButton.addEventListener("click", colorMeditateButton)
exerciseButton.addEventListener("click", colorExerciseButton)

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
    debugger
    
    // Remove any existing messages
    for (var i = 0; i < errorMessages.length; i++) {
      errorMessages[i].parentNode.removeChild(errorMessages[i]);
    }
    debugger
    // Add errors
    for (var i = 0; i < invalidFields.length; i++) {
      parent = invalidFields[i].parentNode;
      invalidFields[i].validationMessage = invalidFields[i].oninvalid()
      parent.insertAdjacentHTML("beforeend", "<div class='error-message'>" +
      invalidFields[i].validationMessage +
      "</div>");
    }
    debugger
  // If there are errors, give focus to the first invalid field
  if (invalidFields.length > 0) {
    invalidFields[0].focus();
  }
});

function colorStudyButton() {
  studyButton.classList.add("green")
  meditateButton.classList.remove("purple")
  exerciseButton.classList.remove("red")
}

function colorMeditateButton() {
  meditateButton.classList.add("purple")
  exerciseButton.classList.remove("red")
  studyButton.classList.remove("green")
}

function colorExerciseButton() {
  exerciseButton.classList.add("red")
  studyButton.classList.remove("green")
  meditateButton.classList.remove("purple")
}
