var btn = document.querySelector("button");
var timer = document.querySelector(".timer");
var header = document.querySelector("#header");
var text = document.querySelector("#text");
var container = document.querySelector(".container");
var form = document.querySelector("form");
var answer = document.querySelector("#answer");

btn.addEventListener("click", handleClick);

showForm(form.getAttribute("state"));

function handleClick(e) {
  e.preventDefault();

  //Initializing clock as global variable to be used in other functions.
  clock = setInterval(tick, 1000);

  question1();
}

function loseGame() {
  clearInterval(clock);
  timer.innerHTML = 0;
  clearButtons();
  getHighScore();
  return;
}

function tick() {
  if (timer.innerHTML > 0) {
    timer.innerHTML -= 1;
  } else {
    loseGame();
  }
}

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

function createButton(text, callback) {
  var button = document.createElement("button");
  button.innerHTML = text;
  button.addEventListener("click", callback);
  container.appendChild(button);
}

function clearButtons() {
  var buttons = document.querySelectorAll("button");

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].style.display = "none";
  }
}

function showForm(state) {
  if (state === "show") {
    form.style.display = "block";
  } else {
    form.style.display = "none";
  }
}

function highScores() {
  header.innerHTML = "HIGH SCORES";

  clearButtons();

  document.querySelector("a").style.display = "none";
  document.querySelector("p").style.display = "none";

  var a = document.createElement("a");
  a.innerHTML = "Take Quiz";
  a.setAttribute("href", "./index.html");

  document.querySelector("header").appendChild(a);
}

function getHighScore() {
  answer.innerHTML = "";
  header.innerHTML = `Your high score is: ${timer.innerHTML}s`;

  clearButtons();

  clearInterval(clock);

  form.setAttribute("state", "show");
  showForm(form.getAttribute("state"));

  var back = document.createElement("button");
  back.innerHTML = "Go Back";

  //from StackOverflow
  back.addEventListener("click", function () {
    document.location.href = "./index.html";
  });
  document.querySelector(".container-buttons").appendChild(back);

  var submit = document.createElement("button");
  submit.innerHTML = "Submit";
  submit.addEventListener("click", function () {});
  document.querySelector(".container-buttons").appendChild(submit);
}

function question1() {
  text.style.display = "none";
  btn.style.display = "none";

  container.setAttribute("style", "align-items: start;");
  header.innerHTML =
    "Which of the following is NOT a primitive data type in JavaScript?";

  createButton("String", tick10);
  createButton("SmallInt", question2);
  createButton("Number", tick10);
  createButton("Boolean", tick10);
}

function question2() {
  correctAnswer();

  header.innerHTML = "How do you find the minimum of x and y using JavaScript?";

  clearButtons();

  createButton("min(x, y)", tick10);
  createButton("Math.min(xy)", tick10);
  createButton("Math.min(x, y)", question3);
  createButton("min(xy)", tick10);
}

function question3() {
  correctAnswer();

  header.innerHTML = "What will the code return?\n(3 < 7)";

  clearButtons();

  createButton("true", question4);
  createButton("false", tick10);
  createButton("NaN", tick10);
  createButton("Syntax Error", tick10);
}

function question4() {
  correctAnswer();

  header.innerHTML =
    "Which statement CANNOT be used to declare a variable in JavaScript?";

  clearButtons();

  createButton("let", tick10);
  createButton("var", tick10);
  createButton("int", getHighScore);
  createButton("const", tick10);
}
