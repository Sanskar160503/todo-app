# Features & Functionalities

## Frontend Features

### Page 1 — Todo List (`/`)

| Feature | Description |
|---|---|
| **View all todos** | Displays all todos in a clean card list |
| **Add todo** | Modal form to create a new todo |
| **Edit todo** | Edit any todo via pencil icon — opens pre-filled modal |
| **Delete todo** | Delete individual todos with confirmation |
| **Toggle complete** | Click the circle checkbox to mark done/pending |
| **View detail** | Click a todo card to navigate to its detail page |
| **Search** | Real-time search across title and description |
| **Filter by status** | Filter by All / Active / Completed |
| **Filter by priority** | Filter by All / High / Medium / Low |
| **Clear completed** | Bulk delete all completed todos at once |
| **Stats bar** | Shows total, completed, pending, high-priority counts |
| **Progress bar** | Visual % completion indicator |
| **Overdue highlight** | Red left border on todos past their due date |

### Page 2 — Todo Detail (`/todo?id=<uuid>`)

| Feature | Description |
|---|---|
| **Query param routing** | Receives todo ID via `?id=` query parameter |
| **Full detail view** | Shows all fields: title, description, priority, tags, dates |
| **Status badge** | Shows Completed / Pending badge |
| **Priority badge** | Colour-coded priority indicator |
| **Toggle from detail** | Mark done/pending without going back to list |
| **Delete from detail** | Delete todo and redirect to list |
| **Error handling** | Shows message if ID is missing or not found |
| **Timestamps** | Displays created at and last updated times |

### Todo Fields

Each todo supports the following fields:

| Field | Type | Description |
|---|---|---|
| `title` | string (required) | Main todo text |
| `description` | string | Optional longer description |
| `priority` | high / medium / low | Urgency level (default: medium) |
| `dueDate` | date | Optional deadline |
| `tags` | string[] | Comma-separated labels (e.g. work, personal) |
| `completed` | boolean | Done status (default: false) |

---

## Backend Features

| Feature | Description |
|---|---|
| **CRUD API** | Full Create, Read, Update, Delete for todos |
| **Toggle endpoint** | Dedicated PATCH endpoint to flip completion |
| **Filter by query params** | `?completed=true`, `?priority=high`, `?search=text` |
| **Stats endpoint** | Returns counts by status and priority |
| **Clear completed** | DELETE all completed todos in one request |
| **File persistence** | Data saved to `todos.json` — survives server restarts |
| **UUID IDs** | Each todo gets a unique UUID v4 identifier |
| **Timestamps** | `createdAt` and `updatedAt` maintained automatically |
| **Input validation** | Returns 400 if title is missing |
| **404 handling** | Returns proper error if todo ID not found |
| **CORS enabled** | Frontend and backend can run on different ports |

---

## UI/UX Features

- Responsive layout (works on mobile and desktop)
- Sticky header navigation
- Modal with keyboard-friendly inputs (autofocus)
- Overdue todos highlighted with red border
- Strikethrough text on completed todos
- Priority colour-coded dots (red / amber / green)
- Tag pills on todo cards and detail page
- Empty state with call-to-action when no todos exist
- Confirmation dialogs before destructive actions
