import TaskRow from "./TaskRow";

function TasksList({
  tasks,
  openMenuId,
  onToggleMenu,
  onEdit,
  onDelete,
  onChangeStatus,
}) {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskRow
          key={task.id}
          task={task}
          openMenuId={openMenuId}
          onToggleMenu={onToggleMenu}
          onEdit={onEdit}
          onDelete={onDelete}
          onChangeStatus={onChangeStatus}
        />
      ))}

      {tasks.length === 0 && (
        <div className="empty-tasks">
          <i className="bi bi-check2-square"></i>

          <h3>No tasks found</h3>

          <p>There are no tasks in this category.</p>
        </div>
      )}
    </div>
  );
}

export default TasksList;
