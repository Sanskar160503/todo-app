# TodoApp — Full-Stack Todo Application

A multi-page todo application built with **React** (frontend) and **Node.js + Express** (backend), with file-based data persistence.

---

## Project Structure

```
todo-app/
├── backend/               # Node.js + Express API
│   ├── server.js          # Main server file
│   ├── todos.json         # Data store (auto-created)
│   └── package.json
│
├── frontend/              # React multi-page app
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js              # Router setup
│   │   ├── api.js              # API helper functions
│   │   ├── styles.css          # Global styles
│   │   ├── pages/
│   │   │   ├── TodoListPage.js    # Page 1: All todos
│   │   │   ├── TodoDetailPage.js  # Page 2: Single todo (via ?id=)
│   │   │   └── NotFoundPage.js    # 404 page
│   │   └── components/
│   │       ├── TodoItem.js        # Individual todo row
│   │       ├── AddTodoModal.js    # Create/edit modal
│   │       └── StatsBar.js        # Stats + progress bar
│   └── package.json
│
├── README.md
├── FEATURES.md
└── API.md
```

---

## Getting Started

### Prerequisites
- Node.js v16+
- npm

### 1. Start the Backend

```bash
cd backend
npm install
node server.js
# Runs on http://localhost:4000
```

### 2. Start the Frontend

```bash
cd frontend
npm install
npm start
# Runs on http://localhost:3000
```

Open your browser at **http://localhost:3000**

---

## Pages

| Route | Description |
|---|---|
| `/` | Todo list page — view, filter, search all todos |
| `/todo?id=<uuid>` | Single todo detail page (receives todo ID as query param) |
| `/404` | Not found page |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, React Router v6 |
| Backend | Node.js, Express 4 |
| Data | JSON file (`todos.json`) |
| Styling | Plain CSS (no dependencies) |
| IDs | UUID v4 |

---

## Documentation

- [FEATURES.md](./FEATURES.md) — All features and functionalities
- [API.md](./API.md) — Backend REST API reference
