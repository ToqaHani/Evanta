const express = require("express");

const {
  getGuests,
  createGuest,
  updateGuest,
  deleteGuest,
} = require("../controllers/guestController");

const router = express.Router();

router.get("/events/:eventId/guests", getGuests);

router.post("/events/:eventId/guests", createGuest);

router.put("/guests/:guestId", updateGuest);

router.delete("/guests/:guestId", deleteGuest);

module.exports = router;
