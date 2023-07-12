function TodoList(props) {
  const todos = props.todos;
  return (
    <ul className="todo-list max-w-md border mt-2 p-4 mx-auto">
      {todos.map((todo, i) => (
        <li key={i} className="flex justify-between my-3 py-2 px-3 bg-gray-300">
          <h2>{todo.title}</h2>
          <p>{todo.description}</p>
          <button onClick={() => props.deleteTodo(todo.id)}>delete</button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
