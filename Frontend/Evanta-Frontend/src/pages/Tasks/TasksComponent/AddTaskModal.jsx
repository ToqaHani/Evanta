function AddTaskModal({
  showModal,
  editingTaskId,
  formData,
  onInputChange,
  onSubmit,
  onClose,
}) {
  if (!showModal) {
    return null;
  }

  return (
    <div className="task-modal-backdrop" onMouseDown={onClose}>
      <div
        className="task-modal"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="task-modal-header">
          <div>
            <span className="page-eyebrow">
              {editingTaskId ? "EDIT TASK" : "NEW TASK"}
            </span>

            <h2>{editingTaskId ? "Edit Task" : "Add Task"}</h2>

            <p>
              {editingTaskId
                ? "Update your task information."
                : "Create a task for your event plan."}
            </p>
          </div>

          <button
            type="button"
            className="task-modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <form onSubmit={onSubmit}>
          <div className="task-form-grid">
            <div className="task-form-field full">
              <label htmlFor="title">Task Name</label>

              <input
                id="title"
                name="title"
                type="text"
                placeholder="e.g. Book Catering"
                value={formData.title}
                onChange={onInputChange}
                required
              />
            </div>

            <div className="task-form-field">
              <label htmlFor="assignedTo">Assigned To</label>

              <input
                id="assignedTo"
                name="assignedTo"
                type="text"
                placeholder="e.g. Mahmoud"
                value={formData.assignedTo}
                onChange={onInputChange}
              />
            </div>

            <div className="task-form-field">
              <label htmlFor="dueDate">Due Date</label>

              <input
                id="dueDate"
                name="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={onInputChange}
              />
            </div>

            <div className="task-form-field">
              <label htmlFor="priority">Priority</label>

              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={onInputChange}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div className="task-form-field">
              <label htmlFor="status">Status</label>

              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={onInputChange}
              >
                <option value="Not Started">Not Started</option>

                <option value="In Progress">In Progress</option>

                <option value="Done">Done</option>
              </select>
            </div>

            <div className="task-form-field full">
              <label htmlFor="notes">Notes</label>

              <textarea
                id="notes"
                name="notes"
                rows="4"
                placeholder="Add any notes or details about this task..."
                value={formData.notes}
                onChange={onInputChange}
              ></textarea>
            </div>
          </div>

          <div className="task-modal-actions">
            <button type="button" className="cancel-task-btn" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" className="save-task-btn">
              <i
                className={editingTaskId ? "bi bi-check2" : "bi bi-plus-lg"}
              ></i>

              {editingTaskId ? "Save Changes" : "Add Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTaskModal;
