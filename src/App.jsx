import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL;

export default function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [loading, setLoading] = useState(false);

  // Fetch all todos
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await fetch(`${API_URL}/todos`);
      const data = await res.json();
      console.log("fetched Todos: ", data);
      setTodos(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch todos");
    }
  };

  const addTodo = async () => {
    if (!newTodo.trim()) {
      toast.error("Todo cannot be empty");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          text: newTodo, 
          day: selectedDay }),
      });
      if (!res.ok) throw new Error("Error adding todo");
      setNewTodo("");
      toast.success("Todo added!");
      fetchTodos();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add todo");
    } finally {
      setLoading(false);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const res = await fetch(`${API_URL}/todos/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error deleting todo");
      toast.success("Todo deleted");
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete todo");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <Toaster position="top-center" />
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          AWS Serverless Todo
        </h1>

        <div className="flex mb-4">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Add a new todo..."
          />

          <select 
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            className="boreder rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>


          <button
            onClick={addTodo}
            disabled={loading}
            className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add"}
          </button>
        </div>

        <div>
          <AnimatePresence>
            {todos.length > 0 ? (
              todos.map((todo) => (
                <motion.div
                  key={todo.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm mb-2"
                >
                  <span className="text-gray-700">{todo.description}</span>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="text-red-500 hover:text-red-700 font-medium"
                  >
                    Delete
                  </button>
                </motion.div>
              ))
            ) : (
              <p className="text-center text-gray-500 mt-6">
                No todos yet — add one!
              </p>
            )}
          </AnimatePresence>
        </div>
      </div>

      <footer className="mt-10 text-sm text-gray-500">
        Built with ❤️ using AWS Lambda, API Gateway, DynamoDB & React
      </footer>
    </div>
  );
}
