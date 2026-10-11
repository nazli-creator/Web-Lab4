const loadTasksBtn = document.getElementById("loadTasksBtn");
const taskList = document.getElementById("taskList");
const statusMessage = document.getElementById("statusMessage");

const taskManager = new TaskManager();

const createTaskElement = (task) => {
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task");
  if (task.completed) {
    taskDiv.classList.add("completed");
  }

  const titleSpan = document.createElement("span");
  titleSpan.textContent = task.title;

  const toggleBtn = document.createElement("button");
  toggleBtn.textContent = "Toggle";
  toggleBtn.addEventListener("click", () => {
    taskManager.toggleTask(task.id);
    renderTasks();
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => {
    taskManager.removeTask(task.id);
    renderTasks();
  });

  taskDiv.appendChild(titleSpan);
  taskDiv.appendChild(toggleBtn);
  taskDiv.appendChild(deleteBtn);

  return taskDiv;
};

const renderTasks = () => {
  taskList.textContent = "";
  taskManager.tasks.forEach((task) => {
    taskList.appendChild(createTaskElement(task));
  });
};

const loadTasks = async () => {
  statusMessage.textContent = "Loading tasks...";

  try {
    const rawTasks = await fetchTasks();

    const json = JSON.stringify(rawTasks);
    const parsedTasks = JSON.parse(json);

    const tasks = parsedTasks.map(
      (item) => new Task(item.id, item.title, item.completed)
    );

    taskManager.setTasks(tasks);
    renderTasks();
    statusMessage.textContent = "";
  } catch (error) {
    statusMessage.textContent = "Failed to load tasks. Please try again.";
  }
};

loadTasksBtn.addEventListener("click", loadTasks);
