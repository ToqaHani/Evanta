function TasksSummary({
  totalTasks,
  completedTasks,
  inProgressTasks,
  notStartedTasks,
}) {
  return (
    <section className="tasks-summary">
      <div className="task-summary-card">
        <div className="summary-icon">
          <i className="bi bi-list-check"></i>
        </div>

        <div>
          <span>Total Tasks</span>
          <strong>{totalTasks}</strong>
        </div>
      </div>

      <div className="task-summary-card">
        <div className="summary-icon completed">
          <i className="bi bi-check2-circle"></i>
        </div>

        <div>
          <span>Done</span>
          <strong>{completedTasks}</strong>
        </div>
      </div>

      <div className="task-summary-card">
        <div className="summary-icon progress">
          <i className="bi bi-arrow-repeat"></i>
        </div>

        <div>
          <span>In Progress</span>
          <strong>{inProgressTasks}</strong>
        </div>
      </div>

      <div className="task-summary-card">
        <div className="summary-icon pending">
          <i className="bi bi-hourglass-split"></i>
        </div>

        <div>
          <span>Not Started</span>
          <strong>{notStartedTasks}</strong>
        </div>
      </div>
    </section>
  );
}

export default TasksSummary;
