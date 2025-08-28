const addBtn = document.querySelector("#addBtn"); 
const clearAll = document.querySelector("#clearAll");
const taskInput = document.querySelector("#taskInput");
const taskList = document.querySelector("#taskList");
const progress = document.querySelector("#progress");
const progressText = document.querySelector("#progressText");
const congrats = document.querySelector("#congrats");

let tasks = [];

// Add Task
addBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text === "") return alert("Enter a task!");

  if (tasks.some(task => task.text.toLowerCase() === text.toLowerCase())) {
    return alert("Task already exists!");
  }

  const task = { text, completed: false };
  tasks.push(task);
  taskInput.value = "";
  renderTasks();
});

taskInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") addBtn.click();
});

// Render Tasks
function renderTasks() {
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    taskList.innerHTML = "<li>No tasks yet! </li>";
    updateProgress();
    return;
  }

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.dataset.index = index;
    checkbox.classList.add("check-task");

    const span = document.createElement("span");
    span.textContent = task.text;

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.classList.add("delete-btn");
    delBtn.dataset.index = index;

    const btnDiv = document.createElement("div");
    btnDiv.appendChild(checkbox);
    btnDiv.appendChild(delBtn);

    li.appendChild(span);
    li.appendChild(btnDiv);
    taskList.appendChild(li);
  });

  updateProgress();
}

// Event Delegation
taskList.addEventListener("click", (e) => {
  // Checkbox toggle
  if (e.target.classList.contains("check-task")) {
    const index = e.target.dataset.index;
    tasks[index].completed = e.target.checked;
    renderTasks();
  }

  // Delete button
  if (e.target.classList.contains("delete-btn")) {
    const index = e.target.dataset.index;
    if (confirm("Are you sure you want to delete this task?")) {
      tasks.splice(index, 1);
      renderTasks();
    }
  }
});

// Clear All
clearAll.addEventListener("click", () => {
  if (tasks.length === 0) return alert("No tasks to clear!");
  if (confirm("Delete all tasks?")) {
    tasks = [];
    renderTasks();
  }
});

// Update Progress
function updateProgress() {
  const total = tasks.length;
  const done = tasks.filter(t => t.completed).length;
  progressText.textContent = `${done} of ${total} tasks completed`;

  if (total > 0) {
    progress.style.width = `${(done / total) * 100}%`;
  } else {
    progress.style.width = "0%";
  }

  if (total > 0 && done === total) {
    congrats.classList.remove("hidden");
  } else {
    congrats.classList.add("hidden");
  }
}


const darkModeBtn = document.querySelector("#darkModeBtn");

darkModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  darkModeBtn.textContent = 
    document.body.classList.contains("dark-mode") ? "☀️ Light Mode" : "🌙 Dark Mode";
});
