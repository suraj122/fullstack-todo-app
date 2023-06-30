// Get the todo list
function logData(data) {
  let list = document.querySelector(".todo-list");
  list.innerHTML = "";
  data.forEach((todo) => {
    let li = document.createElement("li");
    let h2 = document.createElement("h2");
    h2.innerText = todo.title;
    let p = document.createElement("p");
    p.innerText = todo.description;
    let button = document.createElement("button");
    button.innerText = "delete";
    button.addEventListener("click", () => {
      fetch(`http://localhost:3000/todos/${todo.id}`, {
        method: "DELETE",
      }).then((res) => res.json().then(getTodos()));
    });
    li.append(h2, p, button);
    list.appendChild(li);
  });
}
function todoCallback(res) {
  res.json().then(logData);
}

function getTodos() {
  fetch("http://localhost:3000/todos", {
    method: "GET",
  }).then(todoCallback);
}
getTodos();

// Create a todo and add to the list
function createTodo() {
  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;
  fetch("http://localhost:3000/todos", {
    method: "POST",
    body: JSON.stringify({
      title: title,
      description: description,
    }),
    headers: {
      "content-type": "application/json",
    },
  }).then((res) => res.json().then(getTodos));
}
