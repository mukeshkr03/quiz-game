let draggedItem = null;

function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  draggedItem = event.target;
}

function drop(event) {
  event.preventDefault();
  if (event.target.className === "input") {
    event.target.appendChild(draggedItem);
  } else if (event.target.parentElement.className === "input") {
    event.target.parentElement.appendChild(draggedItem);
  }
}

function checkAnswer() {
  const inputs = document.querySelectorAll(".input");
  let sortedValues = [];
  for (let i = 0; i < inputs.length; i++) {
    const value = inputs[i].firstElementChild.innerText;
    sortedValues.push(parseInt(value));
  }
  const sortedCopy = [...sortedValues].sort((a, b) => a - b);
  const isCorrect = sortedValues.every((value, index) => value === sortedCopy[index]);
  const result = document.getElementById("result");
  if (isCorrect) {
    result.textContent = "Correct Answer ✔️";
    result.style.color = "green";
  } else {
    result.textContent = "Wrong Answer ❌";
    result.style.color = "red";
  }
}

function resetGame() {
  const options = document.getElementById("options");
  const inputs = document.getElementById("inputs");
  const result = document.getElementById("result");
  options.append(...document.querySelectorAll(".option"));
  inputs.append(...document.querySelectorAll(".input div"));
  result.textContent = "";
  result.style.color = "inherit";
  document.getElementById("checkBtn").disabled = true;
}

document.addEventListener("DOMContentLoaded", () => {
  const options = document.querySelectorAll(".option");
  const inputs = document.querySelectorAll(".input");
  const option1 = document.querySelector(".option1");
  const option2 = document.querySelector(".option2");
  const option3 = document.querySelector(".option3");
  const option4 = document.querySelector(".option4");
  const option5 = document.querySelector(".option5");


  option1.innerText = Math.ceil(Math.random() * 1000 + 1)
  option2.innerText = Math.ceil(Math.random() * 1000 + 1)
  option3.innerText = Math.ceil(Math.random() * 1000 + 1)
  option4.innerText = Math.ceil(Math.random() * 1000 + 1)
  option5.innerText = Math.ceil(Math.random() * 1000 + 1)


  options.forEach(option => {
    option.addEventListener("dragstart", drag);
  });

  inputs.forEach(input => {
    input.addEventListener("drop", drop);
    input.addEventListener("dragover", allowDrop);
  });
  
  inputs.forEach(input => {
    input.addEventListener("DOMNodeInserted", () => {
      const filledInputs = document.querySelectorAll(".input div");
      document.getElementById("checkBtn").disabled = filledInputs.length !== inputs.length;
    });
  });
});
