import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="page">
      <div className="main">
        <div className="empty-state">
          <div className="empty-icon"></div>
          <h2 style={{ margin: "0 0 8px", fontSize: 24 }}>404 — Page Not Found</h2>
          <p>The page you're looking for doesn't exist.</p>
          <button className="btn btn-primary" onClick={() => navigate("/")}>Go Home</button>
        </div>
      </div>
    </div> 
  );
}
