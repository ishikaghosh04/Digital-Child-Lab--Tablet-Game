
let answer = [];
let startTime = Date.now();
let firstChoice = null;

function addShape(shape) {
  if (answer.length >= 6) return;

  if (answer.length === 0) {
    firstChoice = shape;
  }

  answer.push(shape);

  document.getElementById("answer").textContent =
    answer.join(" ");
}

function checkAnswer() {
  const correctPatterns = [
    "⭐⭐🌙⭐⭐🌙",
    "🌙🌙⭐🌙🌙⭐"
  ];

  const correct = correctPatterns.includes(answer.join(""));
  const responseTime = (Date.now() - startTime) / 1000;

  document.getElementById("result").textContent =
    correct ? "Great job! 🎉" : "Thanks for trying!";

  console.log({
    firstChoice: firstChoice,
    responseTime: responseTime,
    correct: correct,
    answer: answer
  });
}

function resetGame() {
  answer = [];
  firstChoice = null;
  startTime = Date.now();

  document.getElementById("answer").textContent = "";
  document.getElementById("result").textContent = "";
}
