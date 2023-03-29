var btn = document.querySelector("button");
var timer = document.querySelector(".timer");
var mainHeading = document.querySelector("#main-heading");
var text = document.querySelector("#text");
var container = document.querySelector(".container");
var form = document.querySelector("form");
var answer = document.querySelector("#answer");
var input = document.querySelector("input");
var link = document.querySelector("a");
var buttonContainer = document.querySelector(".container-buttons");
var highScoresArray = [];

btn.addEventListener("click", startGame);

link.addEventListener("click", function (event) {
  event.preventDefault();
  highScores();
});

// Toggles whether high score form is hidden or not based on form attribute "state"
toggleForm(form.getAttribute("state"));

function startGame(e) {
  e.preventDefault();

  //Initializing clock as global variable to be used in other functions.
  clock = setInterval(tick, 1000);

  question1();
}

function loseGame() {
  clearInterval(clock);
  clearButtons();
  timer.innerHTML = 0;
  mainHeading.innerHTML =
    "Sorry, you lost on time. Would you like to play again?";
  container.setAttribute("style", "align-items: center;");
  answer.style.display = "none";

  createButton("Play Again", function () {
    //from StackOverflow: button goes back to home page
    document.location.href = "./index.html";
  });
}

//Ticks down clock by 1 second. If timer reaches 0, the game is lost.
function tick() {
  if (timer.innerHTML > 0) {
    timer.innerHTML -= 1;
  } else {
    loseGame();
  }
}

//Ticks down clock by 10 seconds for a wrong answer. If timer reaches 0, the game is lost.
function tick10() {
  if (timer.innerHTML >= 10) {
    timer.innerHTML -= 10;
    wrongAnswer();
  } else {
    loseGame();
  }
}

function wrongAnswer() {
  answer.innerHTML = "Wrong answer!";
}

function correctAnswer() {
  answer.innerHTML = "Correct!";
}

//Creates a button in the main flexbox container with given text and callback function on click
function createButton(text, callback) {
  var button = document.createElement("button");
  button.innerHTML = text;
  button.addEventListener("click", callback);
  container.appendChild(button);
}

//Hides all buttons
function clearButtons() {
  var buttons = document.querySelectorAll("button");

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].style.display = "none";
  }
}

// Toggles whether high score form is hidden or not based on form attribute "state"
function toggleForm(state) {
  if (state === "show") {
    form.style.display = "block";
  } else {
    form.style.display = "none";
  }
}

//Sorting function used for high scores (from StackOverflow)
function compare(a, b) {
  if (a.time > b.time) return -1;
  if (a.time < b.time) return 1;
  return 0;
}

//Gets high scores saved in local storage (if any) and appends high score to sorted array, which is then saved in local storage
function saveScore() {
  if (localStorage.getItem("scores")) {
    highScoresArray = JSON.parse(localStorage.getItem("scores"));
  }
  highScoresArray.push({
    initials: input.value.toUpperCase().slice(0, 2),
    time: timer.innerHTML,
  });
  localStorage.setItem("scores", JSON.stringify(highScoresArray.sort(compare)));

  highScores();
}

function renderScores(scores) {
  if (scores) {
    for (i = 0; i < scores.length; i++) {
      var initials = document.createElement("span");
      var time = document.createElement("span");

      initials.innerHTML = scores[i].initials;
      time.innerHTML = scores[i].time + "s";

      //Creates a container for high scores and appends each high score within
      var containerScores = document.createElement("div");
      containerScores.setAttribute("class", ".container-scores");
      document.querySelector(".container-scores").appendChild(containerScores);
      containerScores.appendChild(initials);
      containerScores.appendChild(time);
    }
  } else {
    //Removes empty container in case of no high scores to clear screen space
    document.querySelector(".container-scores").remove();
  }
}

//Shows the high scores page
function highScores() {
  container.setAttribute("style", "align-items: center;");
  text.setAttribute("style", "display: none");
  answer.innerHTML = "";
  mainHeading.innerHTML = "HIGH SCORES";
  document.querySelector("a").remove();
  document.querySelector("p").style.display = "none";

  clearButtons();

  //Hides form for entering initials
  form.setAttribute("state", "hidden");
  toggleForm(form.getAttribute("state"));

  //Creates a link in the header to return to home page
  var a = document.createElement("a");
  a.innerHTML = "Take Quiz";
  a.setAttribute("href", "./index.html");
  document.querySelector("header").appendChild(a);

  //Renders high scores to the page using scores saved in local storage (if any)
  renderScores(JSON.parse(localStorage.getItem("scores")));

  //Clears high scores from local storage
  createButton("Clear Scores", function () {
    localStorage.clear();
    renderScores(localStorage.getItem("scores"));
  });

  createButton("Go Back", function () {
    document.location.href = "./index.html";
  });
}

function getHighScore() {
  answer.innerHTML = "";
  mainHeading.innerHTML = `Your high score is: ${timer.innerHTML}s`;
  text.innerHTML = "Please enter your initials and click Submit.";
  text.setAttribute("style", "display: contents");
  container.setAttribute("style", "align-items: center;");

  clearButtons();

  clearInterval(clock);

  //Shows form for entering initials
  form.setAttribute("state", "show");
  toggleForm(form.getAttribute("state"));

  //Creates button to go back to home page
  var back = document.createElement("button");
  back.innerHTML = "Go Back";
  back.addEventListener("click", function () {
    document.location.href = "./index.html";
  });
  buttonContainer.appendChild(back);

  //Creates button to submit form and save high score to local storage
  var submit = document.createElement("button");
  submit.innerHTML = "Submit";
  submit.addEventListener("click", function (event) {
    //Prevents page refresh on click
    event.preventDefault();

    saveScore();
  });
  buttonContainer.appendChild(submit);

  //Saves high score to local storage if entering via keyboard
  input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();

      saveScore();
    }
  });
}

//Correct answer go to next question. Wrong answers subtract 10 seconds from clock.
//Once all questions are answered, form to enter and save high scores is rendered

function question1() {
  text.style.display = "none";
  btn.style.display = "none";

  container.setAttribute("style", "align-items: start;");
  mainHeading.innerHTML =
    "Which of the following is NOT a primitive data type in JavaScript?";

  createButton("String", tick10);
  createButton("SmallInt", question2);
  createButton("Number", tick10);
  createButton("Boolean", tick10);
}

function question2() {
  correctAnswer();

  mainHeading.innerHTML =
    "How do you find the minimum of x and y using JavaScript?";

  clearButtons();

  createButton("min(x, y)", tick10);
  createButton("Math.min(xy)", tick10);
  createButton("Math.min(x, y)", question3);
  createButton("min(xy)", tick10);
}

function question3() {
  correctAnswer();

  mainHeading.innerHTML = "What will the code return?\n(3 < 7)";

  clearButtons();

  createButton("true", question4);
  createButton("false", tick10);
  createButton("NaN", tick10);
  createButton("Syntax Error", tick10);
}

function question4() {
  correctAnswer();

  mainHeading.innerHTML =
    "Which statement CANNOT be used to declare a variable in JavaScript?";

  clearButtons();

  createButton("let", tick10);
  createButton("var", tick10);
  createButton("int", getHighScore);
  createButton("const", tick10);
}
