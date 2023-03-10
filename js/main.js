const elForm = document.querySelector(".js-form");
const elInput = document.querySelector(".js-input");
const elSumbitter = document.querySelector(".js-submit");
const elList = document.querySelector(".js-list");
const elAll = document.querySelector(".js-all");
const elComplated = document.querySelector(".js-complated");
const elUnComplated = document.querySelector(".js-uncomplated");

const localData = JSON.parse(window.localStorage.getItem("todos"));
const todos = localData || [];

const renderTodo = (arr, node) => {
  window.localStorage.setItem("todos", JSON.stringify(todos));
  elAll.textContent = todos.length;
  elComplated.textContent = todos.filter((el) => el.isCompleted).length;
  elUnComplated.textContent = todos.filter((el) => !el.isCompleted).length;
  node.innerHTML = "";
  arr.forEach((el) => {
    const newItem = document.createElement("li");
    newItem.setAttribute("class", "list-group-item d-flex align-items-center");
    const newSpan = document.createElement("span");
    newSpan.setAttribute("class", "flex-grow-1 ms-4");
    const newInput = document.createElement("input");
    newInput.setAttribute("class", "form-check-input js-check");
    const newEditBtn = document.createElement("button");
    newEditBtn.setAttribute("class", "btn btn-warning me-2 js-edit");
    const newDeleteBtn = document.createElement("button");
    newDeleteBtn.setAttribute("class", "btn btn-danger js-delete");

    newSpan.textContent = el.text;
    newInput.type = "checkbox";
    newEditBtn.textContent = "EDIT";
    newDeleteBtn.textContent = "DELETE";
    newDeleteBtn.dataset.todoId = el.id;
    newEditBtn.dataset.todoId = el.id;
    newInput.dataset.todoId = el.id;

    newItem.appendChild(newInput);
    newItem.appendChild(newSpan);
    newItem.appendChild(newEditBtn);
    newItem.appendChild(newDeleteBtn);

    if (el.isCompleted) {
      newInput.checked = true;
      newSpan.style.textDecoration = "line-through";
    }

    node.appendChild(newItem);
    elInput.value = "";
  });
};

if (todos.length) {
  renderTodo(todos, elList);
} else {
  const elTitle = document.createElement("h3");
  elTitle.textContent = "Todolar Yo'q ????";
  elTitle.setAttribute("class", "text-center text-primary");
  elList.appendChild(elTitle);
}

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const newTodo = {
    id: todos.length ? todos[todos.length - 1].id - 1 : 1,
    text: elInput.value,
    isCompleted: false,
  };

  todos.push(newTodo);

  renderTodo(todos, elList);
});

elList.addEventListener("click", (evt) => {
  if (evt.target.matches(".js-delete")) {
    let todoId = evt.target.dataset.todoId;

    let finddedindex = todos.findIndex((item) => item.id == todoId);

    todos.splice(finddedindex, 1);
    renderTodo(todos, elList);
  }
  if (evt.target.matches(".js-edit")) {
    let todoId = evt.target.dataset.todoId;

    let findedTodo = todos.find((el) => el.id == todoId);
    let editTodo = prompt("O'zgartirishni kiriting !!!", findedTodo.text);

    findedTodo.text = editTodo;
    renderTodo(todos, elList);
  }
  if (evt.target.matches(".js-check")) {
    let todoId = evt.target.dataset.todoId;
    let findedTodo = todos.find((el) => el.id == todoId);
    findedTodo.isCompleted = !findedTodo.isCompleted;
    renderTodo(todos, elList);
  }
});

const elMainButtons = document.querySelector(".js-all-buttons");
const elAllBtn = document.querySelector(".js-all-btn");
const elComplatedBtn = document.querySelector(".js-complated-btn");
const elUnComplatedBtn = document.querySelector(".js-uncomplated-btn");

elMainButtons.addEventListener("click", (evt) => {
  if (evt.target.matches(".js-all-btn")) {
    renderTodo(todos, elList);
  }
  if (evt.target.matches(".js-complated-btn")) {
    if (elComplated.textContent != 0) {
      const todoFiltered = todos.filter((el) => el.isCompleted);
      renderTodo(todoFiltered, elList);
    }
  }
  if (evt.target.matches(".js-uncomplated-btn")) {
    if (elUnComplated.textContent != 0) {
      const todoFiltered = todos.filter((el) => !el.isCompleted);
      renderTodo(todoFiltered, elList);
    }
  }
});

// DARK MODE

const elModeBtn = document.querySelector(".mode-btn");
let theme = false;

elModeBtn.addEventListener("click", () => {
  theme = !theme;
  const newBg = theme ? "dark" : "light";
  window.localStorage.setItem("theme", newBg);
  newTheme();
});

let newTheme = () => {
  if (window.localStorage.getItem("theme") == "dark") {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
};

newTheme();
