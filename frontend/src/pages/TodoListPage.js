import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import AddTodoModal from "../components/AddTodoModal";
import TodoItem from "../components/TodoItem";
import StatsBar from "../components/StatsBar";

const FILTERS = ["all", "active", "completed"];
const PRIORITIES = ["all", "high", "medium", "low"];

export default function TodoListPage() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [stats, setStats] = useState({});
  const [filter, setFilter] = useState("all");
  const [priority, setPriority] = useState("all");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editTodo, setEditTodo] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAll = useCallback(async () => {
    const params = {};
    if (filter === "active") params.completed = "false";
    if (filter === "completed") params.completed = "true";
    if (priority !== "all") params.priority = priority;
    if (search.trim()) params.search = search.trim();

    const [data, statsData] = await Promise.all([
      api.getTodos(params),
      api.getStats(),
    ]);
    setTodos(data);
    setStats(statsData);
    setLoading(false);
  }, [filter, priority, search]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const handleToggle = async (id) => {
    await api.toggleTodo(id);
    fetchAll();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this todo?")) return;
    await api.deleteTodo(id);
    fetchAll();
  };

  const handleClearCompleted = async () => {
    if (!window.confirm("Clear all completed todos?")) return;
    await api.clearCompleted();
    fetchAll();
  };

  const handleSave = async (data) => {
    if (editTodo) {
      await api.updateTodo(editTodo.id, data);
    } else {
      await api.createTodo(data);
    }
    setShowModal(false);
    setEditTodo(null);
    fetchAll();
  };

  return (
    <div className="page">
      <header className="header">
        <div className="header-inner">
          <h1 className="logo">TodoApp</h1>
          <button className="btn btn-primary" onClick={() => { setEditTodo(null); setShowModal(true); }}>
            + Add Todo
          </button>
        </div>
      </header>

      <main className="main">
        <StatsBar stats={stats} />

        {/* Search */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="   Search todos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Filters */}
        <div className="filters">
          <div className="filter-group">
            <span className="filter-label">Status:</span>
            {FILTERS.map((f) => (
              <button
                key={f}
                className={`filter-btn ${filter === f ? "active" : ""}`}
                onClick={() => setFilter(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          <div className="filter-group">
            <span className="filter-label">Priority:</span>
            {PRIORITIES.map((p) => (
              <button
                key={p}
                className={`filter-btn priority-${p} ${priority === p ? "active" : ""}`}
                onClick={() => setPriority(p)}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>
          {stats.completed > 0 && (
            <button className="btn btn-ghost btn-sm" onClick={handleClearCompleted}>
              🗑 Clear completed
            </button>
          )}
        </div>

        {/* Todo List */}
        {loading ? (
          <div className="empty-state">Loading...</div>
        ) : todos.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <p>No todos found.</p>
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>
              Add your first todo
            </button>
          </div>
        ) : (
          <ul className="todo-list">
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={() => handleToggle(todo.id)}
                onEdit={() => { setEditTodo(todo); setShowModal(true); }}
                onDelete={() => handleDelete(todo.id)}
                onView={() => navigate(`/todo?id=${todo.id}`)}
              />
            ))}
          </ul>
        )}
      </main>

      {showModal && (
        <AddTodoModal
          initial={editTodo}
          onSave={handleSave}
          onClose={() => { setShowModal(false); setEditTodo(null); }}
        />
      )}
    </div>
  );
}
