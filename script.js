const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");

const tasks = document.querySelectorAll(".task");

let dragElement = null;

tasks.forEach((task) => {
  task.addEventListener("drag", (e) => {
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

  const taskTitle = document.querySelector("#task-title").value
  const taskDesc = document.querySelector("#task-desc").value

  const div = document.createElement("div");
  div.classList.add("task");

  div.setAttribute("draggable", "true");

  div.innerHTML = `
    <h3>${taskTitle}</h3>
    <p>${taskDesc}</p>
    <button>Delete</button>
    `;

    todo.appendChild(div)
    
    div.addEventListener("drag", ()=> {
        dragElement = div
    })

    modal.classList.remove("active")
});
