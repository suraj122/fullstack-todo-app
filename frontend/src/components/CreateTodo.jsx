import { useEffect, useState } from "react";
import axios from "axios";

function CreateTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [msg, setMesg] = useState("");

  const addTodo = (e) => {
    e.preventDefault();
    if (title !== "" && description !== "") {
      axios
        .post("http://localhost:3000/todos", {
          title: title,
          description: description,
        })
        .then(() => {
          setTitle("");
          setDescription("");
          setMesg("");
        })
        .catch((err) => console.error(err));
    } else {
      setMesg("Please enter valid input");
    }
  };

  return (
    <form>
      <div>
        <input
          className="block w-full border p-2 mt-2"
          type="text"
          id="title"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <input
          className="block w-full border p-2 mt-2"
          type="text"
          id="description"
          placeholder="Enter Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <footer className="text-center mt-4">
        <p>{msg ? <span>{msg}</span> : ""}</p>
        <button
          onClick={addTodo}
          className="border bg-blue-300 px-4 py-2 inline-block mt-4 text-white"
        >
          Add
        </button>
      </footer>
    </form>
  );
}

export default CreateTodo;
