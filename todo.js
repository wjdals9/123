const toDoForm = document.querySelector(".js_todoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js_pending"),
  doneList = document.querySelector(".js_done");

const PENDING = "toDos";
const FINISHED = "done";

let toDos = [];
let done = [];

let idNumbers = 0;

function savePendingToDos() {
  localStorage.setItem(PENDING, JSON.stringify(toDos));
}

function saveFinishedToDos() {
  localStorage.setItem(FINISHED, JSON.stringify(done));
}

function deletePendingToDo(event) {
  const li = event.target.parentNode;
  toDoList.removeChild(li);
  toDos = toDos.filter(toDo => toDo.id !== parseInt(li.id));
  savePendingToDos();
}

function deleteFinishedToDo(event) {
  const li = event.target.parentNode;
  doneList.removeChild(li);
  done = done.filter(toDo => toDo.id !== parseInt(li.id));
  saveFinishedToDos();
}

function moveToDone(event) {
  const li = event.target.parentNode;
  const id = parseInt(li.id);
  const toDo = toDos.find(toDo => toDo.id === id);
  if (!toDo) return;
  deletePendingToDo(event);
  finishedToDo(toDo.text, id);
}

function moveToPending(event) {
  const li = event.target.parentNode;
  const id = parseInt(li.id);
  const toDo = done.find(toDo => toDo.id === id);
  if (!toDo) return;
  deleteFinishedToDo(event);
  pendingToDo(toDo.text, id);
}

function pendingToDo(text, id = null) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const chkBtn = document.createElement("button");
  const span = document.createElement("span");

  delBtn.innerHTML = "❌";
  chkBtn.innerHTML = "✔";

  delBtn.addEventListener("click", deletePendingToDo);
  chkBtn.addEventListener("click", moveToDone);

  span.innerText = text;
  li.appendChild(span);
  li.appendChild(chkBtn);
  li.appendChild(delBtn);

  if (id) {
    li.id = id;
  } else {
    idNumbers += 1;
    li.id = idNumbers;
  }

  toDoList.appendChild(li);

  if (!id) {
    toDos.push({ text: text, id: idNumbers });
  } else {
    toDos.push({ text: text, id: id });
  }

  savePendingToDos();
}

function finishedToDo(text, id = null) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const cancleBtn = document.createElement("button");
  const span = document.createElement("span");

  cancleBtn.innerHTML = "←";
  delBtn.innerHTML = "❌";

  delBtn.addEventListener("click", deleteFinishedToDo);
  cancleBtn.addEventListener("click", moveToPending);

  span.innerText = text;
  li.appendChild(span);
  li.appendChild(cancleBtn);
  li.appendChild(delBtn);

  if (id) {
    li.id = id;
  } else {
    idNumbers += 1;
    li.id = idNumbers;
  }

  doneList.appendChild(li);

  if (!id) {
    done.push({ text: text, id: idNumbers });
  } else {
    done.push({ text: text, id: id });
  }

  saveFinishedToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value.trim();
  if (currentValue === "") return;
  pendingToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(PENDING);
  const finishedToDos = localStorage.getItem(FINISHED);

  if (loadedToDos !== null) {
    const parsedPendingToDos = JSON.parse(loadedToDos);
    parsedPendingToDos.forEach(toDo => {
      pendingToDo(toDo.text, toDo.id);
    });
  }
  if (finishedToDos !== null) {
    const parsedFinishedToDos = JSON.parse(finishedToDos);
    parsedFinishedToDos.forEach(toDo => {
      finishedToDo(toDo.text, toDo.id);
    });
  }

  // idNumbers 최신화: 로컬스토리지에서 가장 큰 id 찾아서 idNumbers 초기화
  const allIds = [
    ...(loadedToDos ? JSON.parse(loadedToDos).map(t => t.id) : []),
    ...(finishedToDos ? JSON.parse(finishedToDos).map(t => t.id) : []),
  ];
  if (allIds.length > 0) {
    idNumbers = Math.max(...allIds);
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
