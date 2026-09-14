const express = require("express");

const {
  getDashboard,
  createDashboard,
  updateDashboard,
  deleteDashboard,
} = require("../../controllers/dashboard-controllers/dashboardController");

const router = express.Router();

// GET dashboard
router.get("/:eventId/dashboard", getDashboard);

// CREATE dashboard
router.post("/:eventId/dashboard", createDashboard);

// UPDATE dashboard
router.put("/:eventId/dashboard", updateDashboard);

// DELETE dashboard
router.delete("/:eventId/dashboard", deleteDashboard);

module.exports = router;