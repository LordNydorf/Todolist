import TodoCard from "./TodoCard";

export default function TodoList(props) {
  const {
    todos,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    handleToggleComplete,
    handleDeleteTodo,
    handleEditTodo,
    handleClearCompleted,
    handleToggleAll,
    totalCount,
    completedCount,
  } = props;

  const activeCount = totalCount - completedCount;

  // Filter tasks based on current tab and search query
  const filteredTodos = todos.filter((item) => {
    const matchesFilter =
      filter === "all"
        ? true
        : filter === "active"
        ? !item.completed
        : item.completed;

    const matchesSearch = item.text
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div>
      {/* Search & Filter Toolbar */}
      {totalCount > 0 && (
        <section className="toolbar-section">
          {/* Search Box */}
          <div className="search-input-wrapper">
            <i className="fa-solid fa-magnifying-glass search-icon"></i>
            <input
              type="text"
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter tasks by name..."
            />
            {searchQuery && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => setSearchQuery("")}
                title="Clear search"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="filter-pills-group">
            <button
              type="button"
              className={`filter-pill-btn ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
            >
              All ({totalCount})
            </button>
            <button
              type="button"
              className={`filter-pill-btn ${filter === "active" ? "active" : ""}`}
              onClick={() => setFilter("active")}
            >
              Active ({activeCount})
            </button>
            <button
              type="button"
              className={`filter-pill-btn ${filter === "completed" ? "active" : ""}`}
              onClick={() => setFilter("completed")}
            >
              Done ({completedCount})
            </button>
          </div>
        </section>
      )}

      {/* Bulk Actions Header */}
      {totalCount > 0 && (
        <div className="bulk-actions-bar">
          <span>
            {activeCount === 0
              ? "🎉 All tasks finished!"
              : `${activeCount} task${activeCount === 1 ? "" : "s"} remaining`}
          </span>

          <div className="bulk-actions-buttons">
            <button
              type="button"
              className="bulk-action-btn"
              onClick={handleToggleAll}
              title={activeCount === 0 ? "Mark all active" : "Mark all completed"}
            >
              <i className="fa-regular fa-circle-check"></i>
              {activeCount === 0 ? "Reset All" : "Complete All"}
            </button>

            {completedCount > 0 && (
              <button
                type="button"
                className="bulk-action-btn danger"
                onClick={handleClearCompleted}
                title="Remove all completed tasks"
              >
                <i className="fa-regular fa-trash-can"></i>
                Clear Done ({completedCount})
              </button>
            )}
          </div>
        </div>
      )}

      {/* Main Todo List */}
      {filteredTodos.length > 0 ? (
        <ul className="todo-list-container">
          {filteredTodos.map((todo) => {
            // Find original index in master todos list to preserve actions
            const originalIndex = todos.findIndex((t) => t.id === todo.id);
            return (
              <TodoCard
                key={todo.id}
                todo={todo}
                index={originalIndex}
                handleToggleComplete={handleToggleComplete}
                handleDeleteTodo={handleDeleteTodo}
                handleEditTodo={handleEditTodo}
              />
            );
          })}
        </ul>
      ) : (
        /* Empty State */
        <div className="empty-state-card">
          <div className="empty-state-icon">
            {searchQuery ? (
              <i className="fa-solid fa-magnifying-glass"></i>
            ) : filter === "completed" ? (
              <i className="fa-solid fa-list-check"></i>
            ) : (
              <i className="fa-solid fa-clipboard-check"></i>
            )}
          </div>

          <h3 className="empty-state-title">
            {searchQuery
              ? "No matching tasks found"
              : filter === "completed"
              ? "No completed tasks yet"
              : totalCount === 0
              ? "All clear! You're on track."
              : "No active tasks in this view"}
          </h3>

          <p className="empty-state-description">
            {searchQuery
              ? `No task matches "${searchQuery}". Try a different keyword.`
              : filter === "completed"
              ? "Check off tasks as you finish them to see them archived here."
              : totalCount === 0
              ? "Add your top priorities above to organize your day with focus."
              : "Switch filter tabs or create a new task to continue."}
          </p>
        </div>
      )}
    </div>
  );
}
