import { useState, useEffect } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

// Helper to normalize data from legacy string format to rich task object
function normalizeTodo(item, index) {
  if (typeof item === "string") {
    return {
      id: `legacy-${index}-${Date.now()}`,
      text: item,
      completed: false,
      priority: "medium",
      createdAt: Date.now(),
    };
  }
  return {
    id: item.id || `todo-${index}-${Date.now()}`,
    text: item.text || "",
    completed: Boolean(item.completed),
    priority: item.priority || "medium",
    createdAt: item.createdAt || Date.now(),
  };
}

function App() {
  const [todos, setTodos] = useState([]);
  const [todoValue, setTodoValue] = useState("");
  const [priority, setPriority] = useState("medium");
  const [editingIndex, setEditingIndex] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Persist tasks to localStorage
  function persistData(newList) {
    try {
      localStorage.setItem("todos", JSON.stringify({ todos: newList }));
    } catch (e) {
      console.error("Failed to save todos to localStorage", e);
    }
  }

  // Load initial tasks from localStorage
  useEffect(() => {
    try {
      if (typeof window === "undefined" || !localStorage) return;
      const localData = localStorage.getItem("todos");
      if (!localData) return;
      const parsed = JSON.parse(localData);
      if (parsed && Array.isArray(parsed.todos)) {
        const normalized = parsed.todos.map((item, idx) => normalizeTodo(item, idx));
        setTodos(normalized);
      }
    } catch (e) {
      console.error("Failed to load todos from localStorage", e);
    }
  }, []);

  // Add or Update Todo
  function handleAddTodo(text, taskPriority = "medium") {
    if (editingIndex !== null) {
      // Editing existing task
      const updatedTodos = todos.map((item, idx) => {
        if (idx === editingIndex) {
          return {
            ...item,
            text,
            priority: taskPriority,
          };
        }
        return item;
      });
      setTodos(updatedTodos);
      persistData(updatedTodos);
      setEditingIndex(null);
    } else {
      // Adding new task
      const newTodoItem = {
        id: `todo-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        text,
        completed: false,
        priority: taskPriority,
        createdAt: Date.now(),
      };
      const newTodoList = [newTodoItem, ...todos];
      setTodos(newTodoList);
      persistData(newTodoList);
    }
    setTodoValue("");
    setPriority("medium");
  }

  // Toggle complete state
  function handleToggleComplete(index) {
    const newTodoList = todos.map((todo, idx) => {
      if (idx === index) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(newTodoList);
    persistData(newTodoList);
  }

  // Delete single todo
  function handleDeleteTodo(index) {
    const newTodoList = todos.filter((_, idx) => idx !== index);
    setTodos(newTodoList);
    persistData(newTodoList);
    if (editingIndex === index) {
      setEditingIndex(null);
      setTodoValue("");
    }
  }

  // Initiate edit mode
  function handleEditTodo(index) {
    const target = todos[index];
    if (!target) return;
    setTodoValue(target.text);
    setPriority(target.priority || "medium");
    setEditingIndex(index);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Cancel edit mode
  function handleCancelEdit() {
    setEditingIndex(null);
    setTodoValue("");
    setPriority("medium");
  }

  // Clear all completed tasks
  function handleClearCompleted() {
    const newTodoList = todos.filter((todo) => !todo.completed);
    setTodos(newTodoList);
    persistData(newTodoList);
  }

  // Mark all completed or reset all active
  function handleToggleAll() {
    const allCompleted = todos.every((t) => t.completed);
    const newTodoList = todos.map((t) => ({ ...t, completed: !allCompleted }));
    setTodos(newTodoList);
    persistData(newTodoList);
  }

  // Calculated statistics
  const totalCount = todos.length;
  const completedCount = todos.filter((t) => t.completed).length;
  const completionPercentage =
    totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  // Formatted date
  const todayFormatted = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(new Date());

  return (
    <>
      {/* App Branding & Header */}
      <header className="app-header">
        <div className="brand-section">
          <div className="brand-logo-title">
            <img
              src="/favicon.svg"
              alt="TaskFlow Logo"
              className="brand-icon-img"
            />
            <div className="brand-info">
              <h1>TaskFlow</h1>
              <p className="tagline">Streamlined Productivity & Focus</p>
            </div>
          </div>

          <div className="date-pill">
            <i className="fa-regular fa-calendar"></i>
            <span>{todayFormatted}</span>
          </div>
        </div>

        {/* Productivity Progress Bar & Stats */}
        {totalCount > 0 && (
          <div className="stats-card">
            <div className="stats-header">
              <span className="stats-title">
                <i className="fa-solid fa-chart-pie" style={{ color: "var(--accent-emerald)" }}></i>
                Today&apos;s Progress
              </span>
              <span className="stats-badge">
                {completedCount}/{totalCount} Completed ({completionPercentage}%)
              </span>
            </div>

            <div className="progress-bar-track">
              <div
                className="progress-bar-fill"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>

            <div className="stats-footer">
              <span>
                {completionPercentage === 100
                  ? "Outstanding! You cleared all tasks 🚀"
                  : `${totalCount - completedCount} tasks remaining`}
              </span>
              <span>{completionPercentage}% complete</span>
            </div>
          </div>
        )}
      </header>

      {/* Input Section */}
      <main>
        <TodoInput
          todoValue={todoValue}
          setTodoValue={setTodoValue}
          priority={priority}
          setPriority={setPriority}
          handleAddTodo={handleAddTodo}
          editingIndex={editingIndex}
          handleCancelEdit={handleCancelEdit}
        />

        {/* Todo List and Filters */}
        <TodoList
          todos={todos}
          filter={filter}
          setFilter={setFilter}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleToggleComplete={handleToggleComplete}
          handleDeleteTodo={handleDeleteTodo}
          handleEditTodo={handleEditTodo}
          handleClearCompleted={handleClearCompleted}
          handleToggleAll={handleToggleAll}
          totalCount={totalCount}
          completedCount={completedCount}
        />
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>Built with React & Vite • Stored locally in your browser</p>
      </footer>
    </>
  );
}

export default App;
