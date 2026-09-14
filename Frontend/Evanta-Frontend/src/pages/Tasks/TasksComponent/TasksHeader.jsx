function TasksHeader({ onAddTask }) {
  return (
    <header className="tasks-header">
      <div>
        <span className="page-eyebrow">EVENT PLANNING</span>

        <h1>Tasks</h1>

        <p>Keep track of everything that needs to be done.</p>
      </div>

      <button type="button" className="add-task-btn" onClick={onAddTask}>
        <i className="bi bi-plus-lg"></i>
        Add Task
      </button>
    </header>
  );
}

export default TasksHeader;
