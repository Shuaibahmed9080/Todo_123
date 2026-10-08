import { useState } from "react";
import "./App.css";

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all"); // all | active | completed

  const addTodo = (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
    setInput("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const remaining = todos.filter((t) => !t.completed).length;

  return (
    <div className="todo-app">
      <h1>Todo List</h1>

      <form onSubmit={addTodo} className="todo-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What needs to be done?"
        />
        <button type="submit">Add</button>
      </form>

      <ul className="todo-list">
        {filteredTodos.length === 0 && (
          <li className="empty">No todos here 🎉</li>
        )}
        {filteredTodos.map((todo) => (
          <li key={todo.id} className={todo.completed ? "completed" : ""}>
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <span>{todo.text}</span>
            </label>
            <button
              className="delete-btn"
              onClick={() => deleteTodo(todo.id)}
              aria-label="Delete"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      {todos.length > 0 && (
        <div className="todo-footer">
          <span>{remaining} left</span>
          <div className="filters">
            {["all", "active", "completed"].map((f) => (
              <button
                key={f}
                className={filter === f ? "active" : ""}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
          <button onClick={clearCompleted}>Clear completed</button>
        </div>
      )}
    </div>
  );
}