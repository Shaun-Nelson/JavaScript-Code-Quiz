var btn = document.querySelector("button");
var timer = document.querySelector(".timer");
var header = document.querySelector("#header");
var text = document.querySelector("#text");
var container = document.querySelector(".container");
var form = document.querySelector("form");
var answer = document.querySelector("#answer");
var input = document.querySelector("input");
var link = document.querySelector("a");

btn.addEventListener("click", handleClick);

link.addEventListener("click", function (event) {
  event.preventDefault();
  highScores();
});

showForm(form.getAttribute("state"));

var highScoresArray = [];

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

//from StackOverflow
function compare(a, b) {
  if (a.time > b.time) return -1;
  if (a.time < b.time) return 1;
  return 0;
}

function renderScores(scores) {
  if (scores) {
    for (i = 0; i < scores.length; i++) {
      var initials = document.createElement("span");
      var time = document.createElement("span");

      initials.innerHTML = scores[i].initials;
      time.innerHTML = scores[i].time + "s";

      var containerScores = document.createElement("div");
      containerScores.setAttribute("class", ".container-scores");
      document.querySelector(".container-scores").appendChild(containerScores);
      containerScores.appendChild(initials);
      containerScores.appendChild(time);
    }
  } else {
    document.querySelector(".container-scores").remove();
  }
}

function highScores() {
  text.innerHTML = "";
  answer.innerHTML = "";
  header.innerHTML = "HIGH SCORES";
  document.querySelector("a").remove();

  clearButtons();

  form.setAttribute("state", "hidden");
  showForm(form.getAttribute("state"));

  // document.querySelector("a").style.display = "none";
  document.querySelector("p").style.display = "none";

  var a = document.createElement("a");
  a.innerHTML = "Take Quiz";
  a.setAttribute("href", "./index.html");

  document.querySelector("header").appendChild(a);

  renderScores(JSON.parse(localStorage.getItem("scores")));

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
  submit.addEventListener("click", function (event) {
    event.preventDefault();
    if (localStorage.getItem("scores")) {
      highScoresArray = JSON.parse(localStorage.getItem("scores"));
    }
    highScoresArray.push({
      initials: input.value.toUpperCase().slice(0, 2),
      time: timer.innerHTML,
    });
    localStorage.setItem(
      "scores",
      JSON.stringify(highScoresArray.sort(compare))
    );
    highScores();
  });
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
