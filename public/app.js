document.addEventListener("DOMContentLoaded", () => {
  const storedTasks = JSON.parse(localStorage.getItem("tasks"));

  if (storedTasks) {
    storedTasks.forEach((task) => tasks.push(task));
    updateTasksList();
    updateStats();
  }
});

const addTaskBtn = document.querySelector(".add-task-btn");
const taskNumber = document.querySelector(".taks-num");
const taskInput = document.querySelector(".task-input");

let tasks = [];

const saveTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

function addTask(event) {
  event.preventDefault();
  const text = taskInput.value.trim();
  if (text) {
    tasks.push({ text: text, completed: false });
    taskInput.value = "";
    updateTasksList();
    updateStats();
    saveTasks();
  }
}

const toggleTastComplete = (index) => {
  tasks[index].completed = !tasks[index].completed;
  updateTasksList();
  updateStats();
  saveTasks();
};

const deleteTask = (index) => {
  tasks.splice(index, 1);
  updateTasksList();
  updateStats();
  saveTasks();
};

const editTask = (index) => {
  //   const taskInput = document.querySelector(".taskInput");
  taskInput.value = tasks[index].text;

  tasks.splice(index, 1);
  updateTasksList();
  updateStats();
  saveTasks();
};

const updateStats = () => {
  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;
  const progress = (completedTasks / totalTasks) * 100;
  const progressBar = document.querySelector(".progress");
  progressBar.style.width = `${progress}%`;

  document.querySelector(
    ".numbers"
  ).innerText = `${completedTasks} / ${totalTasks}`;

  if (tasks.length && completedTasks === totalTasks) {
    blaskConfetti();
  }
};

const updateTasksList = () => {
  const taskList = document.querySelector(".task-list");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const listItem = document.createElement("li");

    listItem.innerHTML = `
    <div
      class="task ${
        task.completed ? "completed" : ""
      } bg-secondaryBackground p-3 rounded-xl flex justify-between mb-4">
    <div class="left-task flex gap-2">
      <input class="w-5 cursor-pointer checkbox" ${
        task.completed ? "checked" : ""
      } type="checkbox" />
      <p class="text">${task.text}</p>
    </div>
     <div class="right-task">
       <i class="fa-regular fa-pen-to-square text-purple text-[25px] cursor-pointer"
       onClick="editTask(${index})"
       ></i>
       <i class="fa-regular fa-trash-can text-red-600 ml-3  text-[25px] cursor-pointer delete-icon" onClick="deleteTask(${index})" 
       ></i>
     </div>
    </div>
    `;
    listItem.addEventListener("change", () => toggleTastComplete(index));
    taskList.append(listItem);
  });
};
addTaskBtn.addEventListener("click", addTask);

const blaskConfetti = () => {
  const count = 200,
    defaults = {
      origin: { y: 0.7 },
    };

  function fire(particleRatio, opts) {
    confetti(
      Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
      })
    );
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });

  fire(0.2, {
    spread: 60,
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};
