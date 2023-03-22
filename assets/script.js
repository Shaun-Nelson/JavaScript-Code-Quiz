var btn = document.querySelector("button");
var timer = document.querySelector(".timer");
var header = document.querySelector("#header");
var text = document.querySelector("#text");

btn.addEventListener("click", handleClick);

function handleClick(e) {
  e.preventDefault();
  setInterval(tick, 1000);
  question1();
}

function tick() {
  if (timer.innerHTML > 0) {
    timer.innerHTML -= 1;
  } else {
    alert("The game is over! You've run out of time!");
    return;
  }
}

function tick10() {
  if (timer.innerHTML >= 10) {
    timer.innerHTML -= 10;
  } else {
    timer.innerHTML = 0;
    alert("The game is over! You've run out of time!");
    return;
  }
}

function createButton(text, callback) {
  var button = document.createElement("button");
  button.innerHTML = text;
  button.addEventListener("click", callback);
  document.querySelector(".container").appendChild(button);
}

function question1() {
  text.style.display = "none";
  btn.style.display = "none";
  document
    .querySelector(".container")
    .setAttribute("style", "align-items: start;");
  header.innerHTML =
    "Which of the following is NOT a primitive data type in JavaScript?";

  createButton("String", tick10);
  createButton("SmallInt", question2);
  createButton("Number", tick10);
  createButton("Boolean", tick10);
}

function question2() {
  header.innerHTML = "How do you find the minimum of x and y using JavaScript?";
  var buttons = document.querySelectorAll("button");

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].style.display = "none";
    console.log(buttons[i]);
  }

  createButton("min(x, y)", tick10);
  createButton("Math.min(xy)", tick10);
  createButton("Math.min(x, y)", question3);
  createButton("min(xy)", tick10);
}

function question3() {
  header.innerHTML = "What will the code return?\n(3 < 7)";
  var buttons = document.querySelectorAll("button");

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].style.display = "none";
  }

  createButton("true", question4);
  createButton("false", tick10);
  createButton("NaN", tick10);
  createButton("Syntax Error", tick10);
}

function question4() {
  header.innerHTML =
    "Which statement CANNOT be used to declare a variable in JavaScript?";
  var buttons = document.querySelectorAll("button");

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].style.display = "none";
  }

  createButton("let", tick10);
  createButton("var", tick10);
  createButton("int", highScores);
  createButton("const", tick10);
}

function highScores() {
  header.innerHTML = "HIGH SCORES";
  var buttons = document.querySelectorAll("button");

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].style.display = "none";
  }

  document.querySelector("a").style.display = "none";
  document.querySelector("p").style.display = "none";

  var a = document.createElement("a");
  a.innerHTML = "Take Quiz";
  a.setAttribute("href", "./index.html");

  document.querySelector("header").appendChild(a);
}

function getHighScore() {}
