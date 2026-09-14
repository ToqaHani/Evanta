const express = require("express");

const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const router = express.Router();

// Get all tasks for an event
router.get("/events/:eventId/tasks", getTasks);

// Create a new task
router.post("/events/:eventId/tasks", createTask);

// Update a task
router.put("/tasks/:taskId", updateTask);

// Delete a task
router.delete("/tasks/:taskId", deleteTask);

module.exports = router;
