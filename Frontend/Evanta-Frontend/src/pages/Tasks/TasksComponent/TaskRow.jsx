function TaskRow({
  task,
  openMenuId,
  onToggleMenu,
  onEdit,
  onDelete,
  onChangeStatus,
}) {
  return (
    <div className="task-row">
      <div className="task-main">
        <div
          className={`task-status-dot ${task.status
            .toLowerCase()
            .replace(" ", "-")}`}
        ></div>

        <div>
          <strong>{task.title}</strong>
          <span>{task.assignedTo}</span>
        </div>
      </div>

      <div className="task-date">
        <span>Due Date</span>
        <strong>{task.dueDate}</strong>
      </div>

      <span
        className={`priority-badge priority-${task.priority.toLowerCase()}`}
      >
        {task.priority}
      </span>

      <span
        className={`task-status-badge status-${task.status
          .toLowerCase()
          .replace(" ", "-")}`}
      >
        {task.status}
      </span>

      <div className="task-actions">
        <button
          type="button"
          className="task-menu-btn"
          aria-label={`Actions for ${task.title}`}
          onClick={() => onToggleMenu(task.id)}
        >
          <i className="bi bi-three-dots-vertical"></i>
        </button>

        {openMenuId === task.id && (
          <div className="task-actions-menu">
            <button type="button" onClick={() => onEdit(task)}>
              <i className="bi bi-pencil"></i>
              Edit Task
            </button>

            <div className="status-actions">
              <span>Change Status</span>

              <button
                type="button"
                onClick={() => onChangeStatus(task.id, "Not Started")}
              >
                <i className="bi bi-circle"></i>
                Not Started
              </button>

              <button
                type="button"
                onClick={() => onChangeStatus(task.id, "In Progress")}
              >
                <i className="bi bi-arrow-repeat"></i>
                In Progress
              </button>

              <button
                type="button"
                onClick={() => onChangeStatus(task.id, "Done")}
              >
                <i className="bi bi-check2-circle"></i>
                Done
              </button>
            </div>

            <button
              type="button"
              className="delete-action"
              onClick={() => onDelete(task.id)}
            >
              <i className="bi bi-trash3"></i>
              Delete Task
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskRow;
