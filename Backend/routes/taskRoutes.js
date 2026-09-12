const express = require("express");

const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const router = express.Router();

router.get("/events/:eventId/tasks", getTasks);

router.post("/events/:eventId/tasks", createTask);

router.put("/tasks/:taskId", updateTask);

router.delete("/tasks/:taskId", deleteTask);

module.exports = router;