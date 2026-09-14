const express = require("express");

const {
    createEvent
} = require("../controllers/eventController");

const protect = require("../middleware/AuthMiddleware");

const router = express.Router();

router.post("/", protect, createEvent);

module.exports = router;