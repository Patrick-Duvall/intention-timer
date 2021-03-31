var studyButton = document.querySelector("#study-button")
var meditateButton = document.querySelector("#meditate-button")
var exerciseButton = document.querySelector("#exercise-button")

studyButton.addEventListener("click", colorStudyButton)
meditateButton.addEventListener("click", colorMeditateButton)
exerciseButton.addEventListener("click", colorExerciseButton)

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
