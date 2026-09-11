import { useState } from "react";

import TasksHeader from "./pages/Tasks/TasksComponent/TasksHeader";
import TasksSummary from "./pages/Tasks/TasksComponent/TasksSummary";
import TasksControls from "./pages/Tasks/TasksComponent/TasksControls";
import TasksList from "./pages/Tasks/TasksComponent/TasksList";
import AddTaskModal from "./pages/Tasks/TasksComponent/AddTaskModal";

import "./pages/Tasks/tasks.css";

const emptyForm = {
  title: "",
  assignedTo: "",
  dueDate: "",
  priority: "Medium",
  status: "Not Started",
  notes: "",
};

function App() {
  const [tasks, setTasks] = useState([]);

  const [activeFilter, setActiveFilter] = useState("All");

  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState(emptyForm);

  const [editingTaskId, setEditingTaskId] = useState(null);

  const [openMenuId, setOpenMenuId] = useState(null);

  // Form
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add Task
  const handleAddTask = (e) => {
    e.preventDefault();

    const newTask = {
      id: Date.now(),
      ...formData,
    };

    setTasks((prev) => [...prev, newTask]);

    setFormData(emptyForm);
    setShowModal(false);
  };

  // Edit Task
  const handleEditTask = (task) => {
    setEditingTaskId(task.id);

    setFormData({
      title: task.title,
      assignedTo: task.assignedTo,
      dueDate: task.dueDate,
      priority: task.priority,
      status: task.status,
      notes: task.notes,
    });

    setOpenMenuId(null);
    setShowModal(true);
  };

  // Update Task
  const handleUpdateTask = (e) => {
    e.preventDefault();

    setTasks((prev) =>
      prev.map((task) =>
        task.id === editingTaskId
          ? {
              ...task,
              ...formData,
            }
          : task,
      ),
    );

    setEditingTaskId(null);
    setFormData(emptyForm);
    setShowModal(false);
  };

  // Delete Task
  const handleDeleteTask = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));

    setOpenMenuId(null);
  };

  // Change Status
  const handleChangeStatus = (taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: newStatus,
            }
          : task,
      ),
    );

    setOpenMenuId(null);
  };

  // Close Modal
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingTaskId(null);
    setFormData(emptyForm);
  };

  // Filters
  const filteredTasks = tasks.filter((task) => {
    if (activeFilter === "All") {
      return true;
    }

    if (activeFilter === "High Priority") {
      return task.priority === "High";
    }

    return task.status === activeFilter;
  });

  // Summary
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter((task) => task.status === "Done").length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "In Progress",
  ).length;

  const notStartedTasks = tasks.filter(
    (task) => task.status === "Not Started",
  ).length;

  return (
    <main className="tasks-page">
      <TasksHeader
        onAddTask={() => {
          setEditingTaskId(null);
          setFormData(emptyForm);
          setShowModal(true);
        }}
      />

      <TasksSummary
        totalTasks={totalTasks}
        completedTasks={completedTasks}
        inProgressTasks={inProgressTasks}
        notStartedTasks={notStartedTasks}
      />

      <section className="tasks-container">
        <TasksControls
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        <TasksList
          tasks={filteredTasks}
          openMenuId={openMenuId}
          onToggleMenu={(taskId) => {
            setOpenMenuId(openMenuId === taskId ? null : taskId);
          }}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          onChangeStatus={handleChangeStatus}
        />
      </section>

      <AddTaskModal
        showModal={showModal}
        editingTaskId={editingTaskId}
        formData={formData}
        onInputChange={handleInputChange}
        onSubmit={editingTaskId ? handleUpdateTask : handleAddTask}
        onClose={handleCloseModal}
      />
    </main>
  );
}

export default App;
