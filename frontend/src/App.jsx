import { useEffect, useState } from "react";
import axios from "axios";
import CreateTodo from "./components/CreateTodo";
import TodoList from "./components/TodoList";

const useTodos = () => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/todos")
      .then((res) => setTodos(res.data))
      .catch((err) => console.error(err));
    setInterval(() => {
      axios
        .get("http://localhost:3000/todos")
        .then((res) => setTodos(res.data))
        .catch((err) => console.error(err));
    }, 1000);
  }, []);
  return todos;
};

function App() {
  const todos = useTodos();

  const deleteTodo = (id) => {
    axios
      .delete(`http://localhost:3000/todos/${id}`)
      .then()
      .catch((err) => console.error(err));
  };

  return (
    <section className="py-14">
      <header>
        <h1 className="text-center text-3xl font-bold">TODO APP</h1>
      </header>
      <section className="container mx-auto mt-12">
        <div className="max-w-md mx-auto border p-4">
          <CreateTodo />
        </div>
        <TodoList todos={todos} deleteTodo={deleteTodo} />
      </section>
    </section>
  );
}

export default App;
