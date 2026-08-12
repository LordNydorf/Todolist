import { useRef, useEffect } from "react";

export default function TodoInput(props) {
  const {
    todoValue,
    setTodoValue,
    priority,
    setPriority,
    handleAddTodo,
    editingIndex,
    handleCancelEdit,
  } = props;

  const inputRef = useRef(null);

  // Focus input when entering edit mode
  useEffect(() => {
    if (editingIndex !== null && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingIndex]);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!todoValue.trim()) return;
    handleAddTodo(todoValue.trim(), priority);
    setTodoValue("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    } else if (e.key === "Escape") {
      if (editingIndex !== null) {
        handleCancelEdit();
      } else {
        setTodoValue("");
      }
    }
  };

  return (
    <section className={`input-card ${editingIndex !== null ? "editing" : ""}`}>
      {/* Edit Mode Notice */}
      {editingIndex !== null && (
        <div className="edit-mode-indicator">
          <span>
            <i className="fa-solid fa-pen" style={{ marginRight: "6px" }}></i>
            Editing Task #{editingIndex + 1}
          </span>
          <button className="edit-cancel-btn" onClick={handleCancelEdit}>
            <i className="fa-solid fa-xmark" style={{ marginRight: "4px" }}></i>
            Cancel Edit (Esc)
          </button>
        </div>
      )}

      {/* Main Input Row */}
      <form onSubmit={handleSubmit} className="input-form-row">
        <div className="input-field-wrapper">
          <i className="fa-solid fa-plus-circle input-field-icon"></i>
          <input
            ref={inputRef}
            type="text"
            className="todo-input-field"
            value={todoValue}
            onChange={(e) => setTodoValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a new task... (e.g. Finish Q3 roadmap review)"
          />
          {todoValue && (
            <button
              type="button"
              className="input-clear-btn"
              onClick={() => setTodoValue("")}
              title="Clear input"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          )}
        </div>

        <button
          type="submit"
          className="action-submit-btn"
          disabled={!todoValue.trim()}
        >
          {editingIndex !== null ? (
            <>
              <i className="fa-solid fa-check"></i>
              Save Changes
            </>
          ) : (
            <>
              <i className="fa-solid fa-arrow-right"></i>
              Add Task
            </>
          )}
        </button>
      </form>

      {/* Priority Selector and Shortcut Tip */}
      <div className="input-extras-row">
        <div className="priority-selector">
          <span className="priority-label">Priority:</span>
          <div className="priority-options">
            <button
              type="button"
              className={`priority-opt-btn low ${priority === "low" ? "active" : ""}`}
              onClick={() => setPriority("low")}
            >
              Low
            </button>
            <button
              type="button"
              className={`priority-opt-btn medium ${priority === "medium" ? "active" : ""}`}
              onClick={() => setPriority("medium")}
            >
              Medium
            </button>
            <button
              type="button"
              className={`priority-opt-btn high ${priority === "high" ? "active" : ""}`}
              onClick={() => setPriority("high")}
            >
              High
            </button>
          </div>
        </div>

        <div className="shortcut-tip">
          <span>Press <kbd>↵ Enter</kbd> to add</span>
        </div>
      </div>
    </section>
  );
}
