# 🔌 API Reference

Base URL: `http://localhost:4000/api`

---

## Todo Object

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "priority": "medium",
  "dueDate": "2025-12-31T00:00:00.000Z",
  "tags": ["personal", "errands"],
  "completed": false,
  "createdAt": "2025-01-01T10:00:00.000Z",
  "updatedAt": "2025-01-01T10:00:00.000Z"
}
```

---

## Endpoints

### GET `/api/todos`
Returns all todos. Supports optional query parameters.

**Query Params:**

| Param | Values | Description |
|---|---|---|
| `completed` | `true` / `false` | Filter by completion status |
| `priority` | `high` / `medium` / `low` | Filter by priority |
| `search` | any string | Search title and description |

**Example:**
```
GET /api/todos?priority=high&completed=false
```

**Response:** `200 OK` — array of todo objects

---

### GET `/api/todos/:id`
Returns a single todo by ID.

**Response:**
- `200 OK` — todo object
- `404 Not Found` — `{ "error": "Todo not found" }`

---

### POST `/api/todos`
Creates a new todo.

**Body:**
```json
{
  "title": "Buy groceries",        // required
  "description": "Milk and eggs",  // optional
  "priority": "high",              // optional, default: "medium"
  "dueDate": "2025-12-31",         // optional
  "tags": ["personal"]             // optional
}
```

**Response:**
- `201 Created` — new todo object
- `400 Bad Request` — `{ "error": "Title is required" }`

---

### PUT `/api/todos/:id`
Fully updates an existing todo.

**Body:** Same fields as POST (all optional — only included fields are updated).

**Response:**
- `200 OK` — updated todo object
- `404 Not Found`

---

### PATCH `/api/todos/:id/toggle`
Toggles the `completed` status of a todo (true → false, false → true).

**Response:**
- `200 OK` — updated todo object
- `404 Not Found`

---

### DELETE `/api/todos/:id`
Deletes a single todo by ID.

**Response:**
- `200 OK` — `{ "message": "Deleted successfully" }`
- `404 Not Found`

---

### DELETE `/api/todos`
Deletes **all completed** todos.

**Response:**
- `200 OK` — `{ "message": "Cleared completed todos" }`

---

### GET `/api/stats`
Returns aggregate counts.

**Response:**
```json
{
  "total": 10,
  "completed": 4,
  "pending": 6,
  "high": 3,
  "medium": 5,
  "low": 2
}
```
