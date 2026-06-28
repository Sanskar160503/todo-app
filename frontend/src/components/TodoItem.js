import React from "react";

const PRIORITY_DOT = { high: "#ef4444", medium: "#f59e0b", low: "#22c55e" };

export default function TodoItem({ todo, onToggle, onEdit, onDelete, onView }) {
  const isOverdue =
    todo.dueDate && !todo.completed && new Date(todo.dueDate) < new Date();

  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""} ${isOverdue ? "overdue" : ""}`}>
      <button className="check-btn" onClick={onToggle} title="Toggle complete">
        <span className={`check-circle ${todo.completed ? "checked" : ""}`}>
          {todo.completed && "✓"}
        </span>
      </button>
 
      <div className="todo-body" onClick={onView} style={{ cursor: "pointer" }}>
        <div className="todo-title-row">
          <span
            className="priority-dot"
            style={{ background: PRIORITY_DOT[todo.priority] }}
            title={`${todo.priority} priority`}
          />
          <span className={`todo-title ${todo.completed ? "line-through" : ""}`}>
            {todo.title}
          </span>
        </div>
        {todo.description && (
          <p className="todo-desc">{todo.description}</p>
        )}
        <div className="todo-footer">
          {todo.dueDate && (
            <span className={`due-date ${isOverdue ? "overdue-text" : ""}`}>
              {new Date(todo.dueDate).toLocaleDateString("en-IN", { dateStyle: "medium" })}
              {isOverdue && " · Overdue"}
            </span>
          )}
          {todo.tags && todo.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      </div>

      <div className="todo-actions">
        <button className="icon-btn" onClick={onEdit} title="Edit">✏️</button>
        <button className="icon-btn" onClick={onDelete} title="Delete">🗑</button>
      </div>
    </li>
  );
}
