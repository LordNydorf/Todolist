function formatTimestamp(timestamp) {
  if (!timestamp) return "Recently";
  const date = new Date(timestamp);
  const now = new Date();
  const diffMinutes = Math.floor((now - date) / (1000 * 60));
  
  if (diffMinutes < 1) return "Just now";
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export default function TodoCard(props) {
  const {
    todo,
    index,
    handleToggleComplete,
    handleDeleteTodo,
    handleEditTodo,
  } = props;

  const isCompleted = Boolean(todo.completed);
  const priority = todo.priority || "medium";

  return (
    <li className={`todo-card priority-${priority} ${isCompleted ? "completed" : ""}`}>
      {/* Checkbox Toggle Button */}
      <button
        className={`custom-checkbox-btn ${isCompleted ? "checked" : ""}`}
        onClick={() => handleToggleComplete(index)}
        aria-label={isCompleted ? "Mark as active" : "Mark as completed"}
        title={isCompleted ? "Mark as active" : "Mark as completed"}
      >
        {isCompleted && <i className="fa-solid fa-check check-icon"></i>}
      </button>

      {/* Content Area */}
      <div className="todo-content-wrapper">
        <span className="todo-text-line">{todo.text}</span>
        <div className="todo-meta-line">
          <span className={`priority-badge-pill ${priority}`}>
            {priority}
          </span>
          <span className="todo-timestamp">
            <i className="fa-regular fa-clock"></i>
            {formatTimestamp(todo.createdAt)}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="todo-actions-group">
        <button
          className="action-icon-btn edit"
          onClick={() => handleEditTodo(index)}
          aria-label="Edit task"
          title="Edit task"
        >
          <i className="fa-solid fa-pen-to-square"></i>
        </button>

        <button
          className="action-icon-btn delete"
          onClick={() => handleDeleteTodo(index)}
          aria-label="Delete task"
          title="Delete task"
        >
          <i className="fa-regular fa-trash-can"></i>
        </button>
      </div>
    </li>
  );
}
