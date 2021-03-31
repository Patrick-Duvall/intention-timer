var studyButton = document.querySelector("#study-button")
var studyImage = document.querySelector("#study-image")
// var studyButton = document.querySelector("#study-button")
// var studyButton = document.querySelector("#study-button")

studyButton.addEventListener("click", colorStudyButton)

function colorStudyButton() {
  // event.preventDefault
  // debugger
  studyButton.classList.add("green")
}