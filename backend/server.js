const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = 4000;
const DATA_FILE = path.join(__dirname, "todos.json");

app.use(cors());
app.use(express.json());

function readTodos() {
  if (!fs.existsSync(DATA_FILE)) return [];
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
}

function writeTodos(todos) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(todos, null, 2));
}

// GET all todos 
app.get("/api/todos", (req, res) => {
  let todos = readTodos();
  const { priority, completed, search } = req.query;

  if (priority) todos = todos.filter((t) => t.priority === priority);
  if (completed !== undefined)
    todos = todos.filter((t) => String(t.completed) === completed);
  if (search)
    todos = todos.filter(
      (t) =>
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.description.toLowerCase().includes(search.toLowerCase())
    );

  res.json(todos);
});

// GET single todo by id
app.get("/api/todos/:id", (req, res) => {
  const todos = readTodos();
  const todo = todos.find((t) => t.id === req.params.id);
  if (!todo) return res.status(404).json({ error: "Todo not found" });
  res.json(todo);
});

// POST create todo
app.post("/api/todos", (req, res) => {
  const { title, description = "", priority = "medium", dueDate = null, tags = [] } = req.body;
  if (!title || !title.trim())
    return res.status(400).json({ error: "Title is required" });

  const todo = {
    id: uuidv4(),
    title: title.trim(),
    description,
    priority,       // low | medium | high
    dueDate,
    tags,
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const todos = readTodos();
  todos.unshift(todo);
  writeTodos(todos);
  res.status(201).json(todo);
});

// PUT update todo
app.put("/api/todos/:id", (req, res) => {
  const todos = readTodos();
  const idx = todos.findIndex((t) => t.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Todo not found" });

  todos[idx] = {
    ...todos[idx],
    ...req.body,
    id: todos[idx].id,          // prevent id overwrite
    createdAt: todos[idx].createdAt,
    updatedAt: new Date().toISOString(),
  };

  writeTodos(todos);
  res.json(todos[idx]);
});

// PATCH toggle completion
app.patch("/api/todos/:id/toggle", (req, res) => {
  const todos = readTodos();
  const idx = todos.findIndex((t) => t.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Todo not found" });

  todos[idx].completed = !todos[idx].completed;
  todos[idx].updatedAt = new Date().toISOString();
  writeTodos(todos);
  res.json(todos[idx]);
});

// DELETE single todo
app.delete("/api/todos/:id", (req, res) => {
  const todos = readTodos();
  const filtered = todos.filter((t) => t.id !== req.params.id);
  if (filtered.length === todos.length)
    return res.status(404).json({ error: "Todo not found" });
  writeTodos(filtered);
  res.json({ message: "Deleted successfully" });
});

// DELETE all completed
app.delete("/api/todos", (req, res) => {
  const todos = readTodos().filter((t) => !t.completed);
  writeTodos(todos);
  res.json({ message: "Cleared completed todos" });
});

// GET stats
app.get("/api/stats", (req, res) => {
  const todos = readTodos();
  res.json({
    total: todos.length,
    completed: todos.filter((t) => t.completed).length,
    pending: todos.filter((t) => !t.completed).length,
    high: todos.filter((t) => t.priority === "high").length,
    medium: todos.filter((t) => t.priority === "medium").length,
    low: todos.filter((t) => t.priority === "low").length,
  });
});

app.listen(PORT, () => console.log(`✅  Backend running on http://localhost:${PORT}`));
