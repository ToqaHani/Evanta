import { useEffect, useState } from "react";
import { useEvent } from "../../../context/EventContext";

import TasksHeader from "./TasksHeader";
import TasksSummary from "./TasksSummary";
import TasksControls from "./TasksControls";
import TasksList from "./TasksList";
import AddTaskModal from "./AddTaskModal";

import "../tasks.css";

const API_URL = "http://localhost:3000/api";

const emptyForm = {
  title: "",
  assignedTo: "",
  dueDate: "",
  priority: "Medium",
  status: "Not Started",
  notes: "",
};

function TasksBody() {
  const [tasks, setTasks] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);

  const { currentEvent } = useEvent();
  const eventId = currentEvent?._id;

  // GET TASKS
  const fetchTasks = async () => {
    if (!eventId) return;

    try {
      const response = await fetch(`${API_URL}/events/${eventId}/tasks`);

      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }

      const data = await response.json();

      const formattedTasks = data.map((task) => ({
        id: task._id,
        title: task.title,
        assignedTo: task.assignedTo || "",
        dueDate: task.dueDate ? task.dueDate.slice(0, 10) : "",
        priority: task.priority,
        status:
          task.status === "Pending"
            ? "Not Started"
            : task.status === "Completed"
              ? "Done"
              : task.status,
        notes: task.description || "",
      }));

      setTasks(formattedTasks);
    } catch (error) {
      console.error("Failed to load tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [eventId]);

  // FORM
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ADD TASK
  const handleAddTask = async (e) => {
    e.preventDefault();

    if (!eventId) return;

    try {
      const response = await fetch(`${API_URL}/events/${eventId}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          assignedTo: formData.assignedTo,
          description: formData.notes,
          dueDate: formData.dueDate,
          priority: formData.priority,
          status:
            formData.status === "Not Started"
              ? "Pending"
              : formData.status === "Done"
                ? "Completed"
                : formData.status,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create task");
      }

      await fetchTasks();

      setFormData(emptyForm);
      setShowModal(false);
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  // EDIT TASK
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

  // UPDATE TASK
  const handleUpdateTask = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/tasks/${editingTaskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          assignedTo: formData.assignedTo,
          description: formData.notes,
          dueDate: formData.dueDate,
          priority: formData.priority,
          status:
            formData.status === "Not Started"
              ? "Pending"
              : formData.status === "Done"
                ? "Completed"
                : formData.status,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      await fetchTasks();

      setEditingTaskId(null);
      setFormData(emptyForm);
      setShowModal(false);
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  // DELETE TASK
  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      await fetchTasks();
      setOpenMenuId(null);
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  // CHANGE STATUS
  const handleChangeStatus = async (taskId, newStatus) => {
    try {
      const backendStatus =
        newStatus === "Not Started"
          ? "Pending"
          : newStatus === "Done"
            ? "Completed"
            : newStatus;

      const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: backendStatus,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to change status");
      }

      await fetchTasks();
      setOpenMenuId(null);
    } catch (error) {
      console.error("Failed to change status:", error);
    }
  };

  // CLOSE MODAL
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingTaskId(null);
    setFormData(emptyForm);
  };

  // FILTERS
  const filteredTasks = tasks.filter((task) => {
    if (activeFilter === "All") {
      return true;
    }

    if (activeFilter === "High Priority") {
      return task.priority === "High";
    }

    return task.status === activeFilter;
  });

  // SUMMARY
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

export default TasksBody;
