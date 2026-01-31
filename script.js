let taskData = {};

const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");

let columns = [todo, progress, done];
let dragElement = null;

function addTask(title, desc, column) {
  const div = document.createElement("div");

  div.classList.add("task");
  div.setAttribute("draggable", "true");

  div.innerHTML = `
  <h3>${title}</h3>
  <p>${desc}</p>
  <button>Delete</button>
  `;

  column.appendChild(div);

  div.addEventListener("drag", () => {
    dragElement = div;
  });

  const deleteBtn = div.querySelector("button");
  deleteBtn.addEventListener("click", () => {
    div.remove();
    updateTaskCount();
  });
  return div;
}

function updateTaskCount() {
  columns.forEach((col) => {
    const tasks = col.querySelectorAll(".task");
    const count = col.querySelector(".count");

    taskData[col.id] = Array.from(tasks).map((t) => {
      return {
        title: t.querySelector("h3").innerText,
        desc: t.querySelector("p").innerText,
      };
    });

    localStorage.setItem("task", JSON.stringify(taskData));
    count.innerText = tasks.length;
  });
}

if (localStorage.getItem("task")) {
  let data = JSON.parse(localStorage.getItem("task"));

  for (const col in data) {
    const column = document.querySelector(`#${col}`);

    data[col].forEach((task) => {
      addTask(task.title, task.desc, column);
    });
    updateTaskCount();
  }
}

const tasks = document.querySelectorAll(".task");

tasks.forEach((task) => {
  task.addEventListener("drag", () => {
    dragElement = task;
  });
});

function highlight(column) {
  column.addEventListener("dragenter", (e) => {
    e.preventDefault();
    column.classList.add("hover-over");
  });
  column.addEventListener("dragleave", (e) => {
    e.preventDefault();
    column.classList.remove("hover-over");
  });
  column.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
  column.addEventListener("drop", (e) => {
    e.preventDefault();
    column.appendChild(dragElement);
    column.classList.remove("hover-over");

    updateTaskCount();
  });
}

highlight(todo);
highlight(progress);
highlight(done);

/* Modal Logic */
const modal = document.querySelector(".modal");
const toggleModal = document.querySelector("#toggle-modal");
const modalBg = document.querySelector(".bg");
const addTaskBtn = document.querySelector("#add-task-btn");

toggleModal.addEventListener("click", () => {
  modal.classList.add("active");
});

modalBg.addEventListener("click", () => {
  modal.classList.remove("active");
});

addTaskBtn.addEventListener("click", () => {
  const taskTitle = document.querySelector("#task-title").value;
  const taskDesc = document.querySelector("#task-desc").value;

  addTask(taskTitle, taskDesc, todo);
  updateTaskCount();
  modal.classList.remove("active");
});
