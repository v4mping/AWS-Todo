const API_BASE_URL = "https://2rrmzzwy8k.execute-api.us-east-2.amazonaws.com/dev"; 
// api gateway key 

export async function getTodos() {
  const response = await fetch(`${API_BASE_URL}/todos`);
  if (!response.ok) throw new Error("Failed to fetch todos");
  return await response.json();
}

export async function addTodo(description) {
  const response = await fetch(`${API_BASE_URL}/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ description }),
  });
  if (!response.ok) throw new Error("Failed to add todo");
  return await response.json();
}

export async function deleteTodo(id) {
  const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete todo");
  return await response.json();
}
