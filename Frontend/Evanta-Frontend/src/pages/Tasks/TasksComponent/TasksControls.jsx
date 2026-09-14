const filters = ["All", "Not Started", "In Progress", "Done", "High Priority"];

function TasksControls({ activeFilter, onFilterChange }) {
  return (
    <div className="tasks-toolbar">
      <div>
        <h2>Task List</h2>

        <p>Manage your event tasks and track their progress.</p>
      </div>

      <div className="task-filters">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            className={
              activeFilter === filter ? "task-filter active" : "task-filter"
            }
            onClick={() => onFilterChange(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TasksControls;
