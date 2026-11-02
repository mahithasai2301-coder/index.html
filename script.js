const goalInput = document.getElementById("goalInput");
const goalList = document.getElementById("goalList");
const emptyMessage = document.getElementById("emptyMessage");

function loadGoals() {
  const goals = JSON.parse(localStorage.getItem("studyGoals") || "[]");
  goals.forEach(goal => createGoal(goal.text, goal.completed));
  updateEmptyMessage();
}

function addGoal() {
  const text = goalInput.value.trim();
  if (!text) {
    alert("Please enter a study goal.");
    return;
  }

  createGoal(text, false);
  saveGoals();
  goalInput.value = "";
  updateEmptyMessage();
}

function createGoal(text, completed) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.className = "goal-text" + (completed ? " completed" : "");
  span.textContent = text;

  const completeBtn = document.createElement("button");
  completeBtn.className = "complete";
  completeBtn.textContent = completed ? "Undo" : "Done";
  completeBtn.onclick = () => {
    span.classList.toggle("completed");
    completeBtn.textContent = span.classList.contains("completed") ? "Undo" : "Done";
    saveGoals();
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete";
  deleteBtn.textContent = "Delete";
  deleteBtn.onclick = () => {
    li.remove();
    saveGoals();
    updateEmptyMessage();
  };

  const actions = document.createElement("div");
  actions.append(completeBtn, deleteBtn);
  li.append(span, actions);
  goalList.appendChild(li);
}

function saveGoals() {
  const goals = [...goalList.querySelectorAll("li")].map(li => ({
    text: li.querySelector(".goal-text").textContent,
    completed: li.querySelector(".goal-text").classList.contains("completed")
  }));
  localStorage.setItem("studyGoals", JSON.stringify(goals));
}

function updateEmptyMessage() {
  emptyMessage.style.display = goalList.children.length ? "none" : "block";
}

goalInput.addEventListener("keydown", event => {
  if (event.key === "Enter") addGoal();
});

loadGoals();
