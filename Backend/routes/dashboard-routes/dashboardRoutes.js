const express = require("express");
const router = express.Router();

const {
  getDashboard,
} = require("../../controllers/dashboard-controllers/dashboardController");

// GET dashboard data for a specific event
router.get("/:eventId/dashboard", getDashboard);

module.exports = router;