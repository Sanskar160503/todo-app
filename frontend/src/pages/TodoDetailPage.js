import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { api } from "../api";

const PRIORITY_COLORS = { high: "#ef4444", medium: "#f59e0b", low: "#22c55e" };
const PRIORITY_BG = { high: "#fef2f2", medium: "#fffbeb", low: "#f0fdf4" };

export default function TodoDetailPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const id = params.get("id");

  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    if (!id) { setError("No todo ID provided."); setLoading(false); return; }
    api.getTodo(id)
      .then((data) => {
        if (data.error) setError(data.error);
        else setTodo(data);
        setLoading(false);
      })
      .catch(() => { setError("Failed to fetch todo."); setLoading(false); });
  }, [id]);

  const handleToggle = async () => {
    const updated = await api.toggleTodo(todo.id);
    setTodo(updated);
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this todo?")) return;
    await api.deleteTodo(todo.id);
    navigate("/");
  };

  const formatDate = (iso) =>
    iso ? new Date(iso).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }) : "—";

  if (loading) return <div className="page"><div className="main"><div className="empty-state">Loading...</div></div></div>;
  if (error) return (
    <div className="page">
      <div className="main">
        <div className="empty-state">
          <div className="empty-icon"></div>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={() => navigate("/")}>← Back to Todos</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="page">
      <header className="header">
        <div className="header-inner">
          <button className="btn btn-ghost" onClick={() => navigate("/")}>← Back</button>
          <h1 className="logo">Todo Detail</h1>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn-ghost btn-sm" onClick={handleToggle}>
              {todo.completed ? "↩ Mark Pending" : "✓ Mark Done"}
            </button>
            <button className="btn btn-danger btn-sm" onClick={handleDelete}>Delete</button>
          </div>
        </div>
      </header>

      <main className="main">
        <div className="detail-card">
          {/* Status badge */}
          <div className="detail-top">
            <span className={`badge ${todo.completed ? "badge-done" : "badge-pending"}`}>
              {todo.completed ? "Completed" : "Pending"}
            </span>
            <span
              className="badge"
              style={{
                background: PRIORITY_BG[todo.priority],
                color: PRIORITY_COLORS[todo.priority],
                border: `1px solid ${PRIORITY_COLORS[todo.priority]}33`,
              }}
            >
              {todo.priority.toUpperCase()} PRIORITY
            </span>
          </div>

          {/* Title */}
          <h2 className={`detail-title ${todo.completed ? "line-through" : ""}`}>{todo.title}</h2>

          {/* Description */}
          <div className="detail-section">
            <h3 className="section-label">Description</h3>
            <p className="detail-desc">{todo.description || "No description provided."}</p>
          </div>

          {/* Tags */}
          {todo.tags && todo.tags.length > 0 && (
            <div className="detail-section">
              <h3 className="section-label">Tags</h3>
              <div className="tag-list">
                {todo.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          )}

          {/* Meta */}
          <div className="detail-meta">
            <div className="meta-row">
              <span className="meta-label">Due Date</span>
              <span className="meta-value">{todo.dueDate ? new Date(todo.dueDate).toLocaleDateString("en-IN", { dateStyle: "long" }) : "Not set"}</span>
            </div>
            <div className="meta-row">
              <span className="meta-label">Created</span>
              <span className="meta-value">{formatDate(todo.createdAt)}</span>
            </div>
            <div className="meta-row">
              <span className="meta-label">Last Updated</span>
              <span className="meta-value">{formatDate(todo.updatedAt)}</span>
            </div>
            <div className="meta-row">
              <span className="meta-label">ID</span>
              <span className="meta-value mono">{todo.id}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
