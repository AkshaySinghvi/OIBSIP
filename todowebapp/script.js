
let tasks = [];

function saveTask() {
  const titleInput = document.getElementById("titleInput");
  const descInput = document.getElementById("descInput");
  const message = document.getElementById("message");

  const title = titleInput.value.trim();
  const description = descInput.value.trim();

  if (title === "") {
    message.textContent = "Please fill out this field";
    titleInput.focus();
    return;
  }

  const task = {
    title: title,
    description: description,
    completed: false,
    timestamp: new Date().toLocaleString()
  };

  tasks.push(task);

  titleInput.value = "";
  descInput.value = "";
  message.textContent = "";
  


  showTasks();
}

function showTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    //task columns
    const taskColumns = document.createElement("div");
    taskColumns.classList.add("task-box", "task-columns");
    const titleColumn = document.createElement("div");
    titleColumn.textContent = "Title";
    const descriptionColumn = document.createElement("div");
    descriptionColumn.textContent = "Description";
    const deleteColumn = document.createElement("div");
    deleteColumn.textContent = "Delete";
    taskColumns.appendChild(titleColumn);
    taskColumns.appendChild(descriptionColumn);
    taskColumns.appendChild(deleteColumn);
    taskList.appendChild(taskColumns);

    // Task Boxes
    tasks.forEach((task, index) => {
        const taskBox = document.createElement("div");
        taskBox.classList.add("task-box");

        const titleDiv = document.createElement("div");
        titleDiv.textContent = task.title;

        const descriptionDiv = document.createElement("div");
        descriptionDiv.textContent = task.description;

        const deleteDiv = document.createElement("div");
        deleteDiv.classList.add("delete");
        deleteDiv.textContent = "X";
        deleteDiv.addEventListener("click", () => deleteTask(index));

        taskBox.appendChild(titleDiv);
        taskBox.appendChild(descriptionDiv);
        taskBox.appendChild(deleteDiv);

        taskList.appendChild(taskBox);
    });

    // Add a new box similar to the above section
    const newTaskBox = document.createElement("div");
    newTaskBox.classList.add("task-box");

    const newTitleDiv = document.createElement("div");
    newTitleDiv.textContent = "New Title";

    const newDescriptionDiv = document.createElement("div");
    newDescriptionDiv.textContent = "New Description";

    const newDeleteDiv = document.createElement("div");
    newDeleteDiv.classList.add("delete");
    newDeleteDiv.textContent = "X";
    newDeleteDiv.addEventListener("click", () => deleteTask(tasks.length));

    
}

function deleteTask(index) {
  tasks.splice(index, 1);
  showTasks();
}

showTasks();
