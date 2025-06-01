const toDoForm = document.querySelector(".js_todoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js_pending"),
  doneList = document.querySelector(".js_done");

const PENDING = "toDos";
const FINISHED = "done";

let toDos = [];
let done = [];

let idNumbers = 1;

function deletePendingToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  toDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  savePendingToDos();
}

function moveToDone(event) {
  const li = event.target.parentNode;
  const id = parseInt(li.id);
  const toDo = toDos.find((t) => t.id === id);
  if (!toDo) return;

  deletePendingToDo(event);
  finishedToDo(toDo.text);
}

function moveToPending(event) {
  const li = event.target.parentNode;
  const id = parseInt(li.id);
  const toDo = done.find((t) => t.id === id);
  if (!toDo) return;

  deleteFinishedToDo(event);
  pendingToDo(toDo.text);
}

function deleteFinishedToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  doneList.removeChild(li);
  done = done.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  saveFinishedToDos();
}

function savePendingToDos() {
  localStorage.setItem(PENDING, JSON.stringify(toDos));
}

function saveFinishedToDos() {
  localStorage.setItem(FINISHED, JSON.stringify(done));
}

function pendingToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const chkBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = idNumbers;
  idNumbers += 1;

  delBtn.innerHTML = "❌";
  chkBtn.innerHTML = "✔";

  delBtn.addEventListener("click", deletePendingToDo);
  chkBtn.addEventListener("click", moveToDone);

  span.innerText = text;
  li.appendChild(span);
  li.appendChild(chkBtn);
  li.appendChild(delBtn);
  li.id = newId;
  toDoList.appendChild(li);

  const toDoObj = {
    text: text,
    id: newId,
  };
  toDos.push(toDoObj);
  savePendingToDos();
}

function finishedToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const cancleBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = idNumbers;
  idNumbers += 1;

  cancleBtn.innerHTML = "←";
  delBtn.innerHTML = "❌";

  delBtn.addEventListener("click", deleteFinishedToDo);
  cancleBtn.addEventListener("click", moveToPending);

  span.innerText = text;
  li.appendChild(span);
  li.appendChild(cancleBtn);
  li.appendChild(delBtn);
  li.id = newId;
  doneList.appendChild(li);

  const toDoObj = {
    text: text,
    id: newId,
  };
  done.push(toDoObj);
  saveFinishedToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  if (currentValue === "") return;
  pendingToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(PENDING);
  const finishedToDos = localStorage.getItem(FINISHED);

  if (loadedToDos !== null) {
    const parsedPendingToDos = JSON.parse(loadedToDos);
    parsedPendingToDos.forEach(function (toDo) {
      pendingToDo(toDo.text);
    });
  }
  if (finishedToDos !== null) {
    const parsedFinishedToDos = JSON.parse(finishedToDos);
    parsedFinishedToDos.forEach(function (toDo) {
      finishedToDo(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
