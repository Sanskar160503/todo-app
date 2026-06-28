const BASE = "http://localhost:4000/api";

export const api = {
  getTodos: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return fetch(`${BASE}/todos${qs ? "?" + qs : ""}`).then((r) => r.json());
  },
  getTodo: (id) => fetch(`${BASE}/todos/${id}`).then((r) => r.json()),
  createTodo: (data) =>
    fetch(`${BASE}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((r) => r.json()),
  updateTodo: (id, data) =>
    fetch(`${BASE}/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((r) => r.json()),
  toggleTodo: (id) =>
    fetch(`${BASE}/todos/${id}/toggle`, { method: "PATCH" }).then((r) => r.json()),
  deleteTodo: (id) =>
    fetch(`${BASE}/todos/${id}`, { method: "DELETE" }).then((r) => r.json()),
  clearCompleted: () =>
    fetch(`${BASE}/todos`, { method: "DELETE" }).then((r) => r.json()),
  getStats: () => fetch(`${BASE}/stats`).then((r) => r.json()),
};
