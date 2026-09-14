const express = require("express");

const {
    createEvent,
    getEvents,
    updateEvent,
    deleteEvent
} = require("../controllers/eventController");

const protect = require("../middleware/AuthMiddleware");

const router = express.Router();

router.post("/", protect, createEvent);
router.get("/", protect, getEvents);
router.put("/:eventId", protect, updateEvent);
router.delete("/:eventId", protect, deleteEvent);

module.exports = router;