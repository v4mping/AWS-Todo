import { useEffect, useState } from "react";
import { getTodos, addTodo, deleteTodo } from "./api";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getTodos();
        setTodos(data);
      } catch (err) {
        setError("Failed to load todos.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  async function handleAdd() {
    if (!newTodo.trim()) return;
    try {
      const added = await addTodo(newTodo);
      setTodos([...todos, added]);
      setNewTodo("");
    } catch {
      setError("Failed to add todo.");
    }
  }

  async function handleDelete(id) {
    try {
      await deleteTodo(id);
      setTodos(todos.filter((t) => t.id !== id));
    } catch {
      setError("Failed to delete todo.");
    }
  }

  if (loading) return <p>Loading todos...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ margin: "2rem auto", width: "400px", textAlign: "center" }}>
      <h1>My Serverless Todos</h1>
      <div style={{ marginBottom: "1rem" }}>
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="New todo..."
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo) => (
          <li key={todo.id} style={{ margin: "0.5rem 0" }}>
            {todo.description}
            <button
              style={{ marginLeft: "1rem" }}
              onClick={() => handleDelete(todo.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}