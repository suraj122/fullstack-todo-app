const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 3000;

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Get all the todos in the list
app.get("/todos", (req, res) => {
  fs.readFile("todos.json", "utf-8", (err, data) => {
    if (err) {
      throw err;
    } else {
      res.send(JSON.parse(data));
    }
  });
});

// Get single todo with the ID provided
app.get("/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  fs.readFile("todos.json", "utf-8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const todos = JSON.parse(data);
      const filteredTodo = todos.find((todo) => todo.id === id);
      if (filteredTodo) {
        res.json(filteredTodo);
      } else {
        res.status(404).send("Todo not found");
      }
    }
  });
});

// Add a todo in the list
app.post("/todos", (req, res) => {
  const todo = {
    id: Math.floor(Math.random() * 1000000),
    title: req.body.title,
    description: req.body.description,
  };
  fs.readFile("todos.json", "utf-8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const todos = JSON.parse(data);
      todos.push(todo);
      fs.writeFile("todos.json", JSON.stringify(todos), (err) => {
        if (err) {
          throw err;
        } else {
          res.status(201).json(todo);
        }
      });
    }
  });
});

// Update an todo
app.put("/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  fs.readFile("todos.json", "utf-8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const todos = JSON.parse(data);
      const filteredTodo = todos.find((todo) => todo.id === id);
      const index = todos.indexOf(filteredTodo);
      if (index !== -1) {
        todos[index].title = req.body.title;
        todos[index].description = req.body.description;
        fs.writeFile("todos.json", JSON.stringify(todos), (err) => {
          if (err) {
            throw err;
          } else {
            res.json(todos[index]);
          }
        });
      } else {
        res.status(404).send();
      }
    }
  });
});

// Delete a todo
app.delete("/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  fs.readFile("todos.json", "utf-8", (err, data) => {
    const todos = JSON.parse(data);
    const filteredTodo = todos.find((todo) => todo.id === id);
    const index = todos.indexOf(filteredTodo);
    if (index !== -1) {
      todos.splice(index, 1);
      fs.writeFile("todos.json", JSON.stringify(todos), (err) => {
        if (err) {
          throw err;
        } else {
          res.status(200).json({ message: "Todo deleted" });
        }
      });
    } else {
      res.status(404).send();
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
