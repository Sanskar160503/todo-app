import React from "react";

export default function StatsBar({ stats }) {
  const pct = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div className="stats-bar">
      <div className="stat"><span className="stat-num">{stats.total ?? 0}</span><span className="stat-lbl">Total</span></div>
      <div className="stat"><span className="stat-num text-green">{stats.completed ?? 0}</span><span className="stat-lbl">Done</span></div>
      <div className="stat"><span className="stat-num text-blue">{stats.pending ?? 0}</span><span className="stat-lbl">Pending</span></div>
      <div className="stat"><span className="stat-num text-red">{stats.high ?? 0}</span><span className="stat-lbl">High</span></div>
      <div className="stat progress-stat">
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${pct}%` }} />
        </div>
        <span className="stat-lbl">{pct}% complete</span>
      </div>
    </div>
  ); 
}
