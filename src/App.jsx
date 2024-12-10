import axios from "axios";
import React, { useState, useEffect } from "react";

function App() {
  const [todo, setTodo] = useState([]);
  const [task, setTask] = useState("");

  useEffect(() => {
    fetchTodo();
  }, []);

  const fetchTodo = async () => {
    try {
      const response = await axios.get("http://localhost:8080/todo");
      setTodo(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addTodo = async () => {
    try {
      const response = await axios.post("http://localhost:8080/todo", { task });
      setTodo([...todo, response.data]);
      setTask("");
    } catch (error) {
      console.error(error);
    }
  };

  const toggleComplete = async (id, isCompleted) => {
    try {
      const response = await axios.put(`http://localhost:8080/todo/${id}`, {
        isCompleted: !isCompleted,
      });
      setTodo(todo.map((todos) => (todos._id === id ? response.data : todos)));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/todo/${id}`);
      setTodo(todo.filter((todos) => todos._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a task"
      />
      <button onClick={addTodo}>Add</button>
      <div>
        {todo.map((todos) => (
          <div key={todos._id} style={{ marginBottom: "10px" }}>
            <input
              type="checkbox"
              checked={todos.isCompleted}
              onChange={() => toggleComplete(todos._id, todos.isCompleted)}
            />
            <span
              style={{
                textDecoration: todos.isCompleted ? "line-through" : "",
                marginLeft: "8px",
              }}
            >
              {todos.task}
            </span>
            <button onClick={() => deleteTodo(todos._id)} style={{ marginLeft: "8px" }}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
