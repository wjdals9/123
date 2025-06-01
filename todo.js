

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
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });

  toDos = cleanToDos;

  savePendingToDos();
}

function addToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id === parseInt(li.id);
  });

  const parsedcleanToDos = cleanToDos;
  parsedcleanToDos.forEach(function (toDo) {
    finishedToDo(toDo.text);
  });
}

function backToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const cleanToDos = done.filter(function (toDo) {
    return toDo.id === parseInt(li.id);
  });

  const parsedcleanToDos = cleanToDos;
  parsedcleanToDos.forEach(function (toDo) {
    pendingToDo(toDo.text);
  });
}

function deleteFinishedToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  doneList.removeChild(li);
  const cleanToDos = done.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });

  done = cleanToDos;

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
  chkBtn.addEventListener("click", addToDo);
  chkBtn.addEventListener("click", deletePendingToDo);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(chkBtn);
  li.appendChild(delBtn);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
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
  cancleBtn.addEventListener("click", backToDo); //todo : take it back
  cancleBtn.addEventListener("click", deleteFinishedToDo);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(cancleBtn);
  li.appendChild(delBtn);
  li.id = newId;
  doneList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  };
  done.push(toDoObj);
  saveFinishedToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  pendingToDo(currentValue);
  done.push();
  saveFinishedToDos();
  //finishedToDo(adddeValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(PENDING);
  const finishedToDos = localStorage.getItem(FINISHED);

  if (loadedToDos !== null || finishedToDos !== null) {
    const parsedPendingToDos = JSON.parse(loadedToDos);
    parsedPendingToDos.forEach(function (toDo) {
      pendingToDo(toDo.text);
    });
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
