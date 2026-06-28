import React, { useState, useEffect } from "react";

export default function AddTodoModal({ initial, onSave, onClose }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
    tags: "", 
  });

  useEffect(() => {
    if (initial) {
      setForm({
        title: initial.title || "",
        description: initial.description || "",
        priority: initial.priority || "medium",
        dueDate: initial.dueDate ? initial.dueDate.split("T")[0] : "",
        tags: (initial.tags || []).join(", "),
      });
    }
  }, [initial]);

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = () => {
    if (!form.title.trim()) return alert("Title is required!");
    onSave({
      ...form,
      tags: form.tags ? form.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
      dueDate: form.dueDate || null,
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{initial ? "Edit Todo" : "Add New Todo"}</h2>
          <button className="icon-btn" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <label className="field-label">Title *</label>
          <input
            className="field-input"
            placeholder="What needs to be done?"
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            autoFocus
          />

          <label className="field-label">Description</label>
          <textarea
            className="field-input field-textarea"
            placeholder="Add more details..."
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
          />

          <div className="field-row">
            <div style={{ flex: 1 }}>
              <label className="field-label">Priority</label>
              <select
                className="field-input"
                value={form.priority}
                onChange={(e) => set("priority", e.target.value)}
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label className="field-label">Due Date</label>
              <input
                type="date"
                className="field-input"
                value={form.dueDate}
                onChange={(e) => set("dueDate", e.target.value)}
              />
            </div>
          </div>

          <label className="field-label">Tags (comma separated)</label>
          <input
            className="field-input"
            placeholder="work, urgent, personal"
            value={form.tags}
            onChange={(e) => set("tags", e.target.value)}
          />
        </div>

        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            {initial ? "Save Changes" : "Add Todo"}
          </button>
        </div>
      </div>
    </div>
  );
}
