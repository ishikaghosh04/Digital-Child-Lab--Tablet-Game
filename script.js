
let answer = Array(6).fill(null);
let firstChoice = null;
let startTime = performance.now();
let firstResponseTime = null;

let ghost = null;
let activePointerId = null;
let draggingShape = null;

const slots = document.querySelectorAll(".slot");
const shapes = document.querySelectorAll(".shape");

// Start dragging a star or moon
shapes.forEach(shape => {
  shape.addEventListener("pointerdown", event => {
    if (ghost) return;

    event.preventDefault();

    draggingShape = shape.dataset.shape;
    activePointerId = event.pointerId;

    // Make a floating copy of the shape
    ghost = shape.cloneNode(true);
    ghost.classList.add("drag-ghost");
    document.body.appendChild(ghost);

    moveGhost(event.clientX, event.clientY);

    shape.setPointerCapture(event.pointerId);
  });
});

// Move the floating shape with the pointer
document.addEventListener("pointermove", event => {
  if (!ghost || event.pointerId !== activePointerId) {
    return;
  }

  moveGhost(event.clientX, event.clientY);

  slots.forEach(slot => {
    slot.classList.remove("highlight");
  });

  const target = document.elementFromPoint(
    event.clientX,
    event.clientY
  );

  const slot = target?.closest(".slot");

  if (slot) {
    slot.classList.add("highlight");
  }
});

// Drop the shape into a slot
document.addEventListener("pointerup", event => {
  if (!ghost || event.pointerId !== activePointerId) {
    return;
  }

  const target = document.elementFromPoint(
    event.clientX,
    event.clientY
  );

  const slot = target?.closest(".slot");

  if (slot) {
    const index = Number(slot.dataset.index);

    if (firstChoice === null) {
      firstChoice = draggingShape;
      firstResponseTime =
        (performance.now() - startTime) / 1000;
    }

    answer[index] = draggingShape;
    updateAnswer();
  }

  stopDragging();
});

document.addEventListener("pointercancel", event => {
  if (event.pointerId === activePointerId) {
    stopDragging();
  }
});

function moveGhost(x, y) {
  ghost.style.left = x + "px";
  ghost.style.top = y + "px";
}

function stopDragging() {
  if (ghost) ghost.remove();

  ghost = null;
  draggingShape = null;
  activePointerId = null;

  slots.forEach(slot => {
    slot.classList.remove("highlight");
  });
}

// Display placed shapes
function updateAnswer() {
  slots.forEach((slot, index) => {
    slot.textContent = answer[index] || "";
  });

  document.getElementById("result").textContent = "";
}

// Check the completed pattern
function checkAnswer() {
  if (answer.includes(null)) {
    document.getElementById("result").textContent =
      "Fill all the boxes first!";
    return;
  }

  const correctPatterns = [
    "⭐⭐🌙⭐⭐🌙",
    "🌙🌙⭐🌙🌙⭐"
  ];

  const correct = correctPatterns.includes(
    answer.join("")
  );

  const completionTime =
    (performance.now() - startTime) / 1000;

  document.getElementById("result").textContent =
    correct ? "Great job! 🎉" : "Thanks for trying!";

  console.log({
    firstChoice,
    firstResponseTime,
    completionTime,
    correct,
    answer: [...answer]
  });
}

// Reset the round
function resetGame() {
  stopDragging();

  answer = Array(6).fill(null);
  firstChoice = null;
  firstResponseTime = null;
  startTime = performance.now();

  updateAnswer();
}
