const Guest = require("../models/Guest");

const getGuests = async (req, res) => {
  try {
    const guests = await Guest.find({
      eventId: req.params.eventId,
    });

    res.status(200).json(guests);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get guests",
      error: error.message,
    });
  }
};

const createGuest = async (req, res) => {
  try {
    const { name, phone, status } = req.body;

    const guest = await Guest.create({
      eventId: req.params.eventId,
      name,
      phone,
      status,
    });

    res.status(201).json(guest);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create guest",
      error: error.message,
    });
  }
};

const updateGuest = async (req, res) => {
  try {
    const guest = await Guest.findByIdAndUpdate(req.params.guestId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!guest) {
      return res.status(404).json({
        message: "Guest not found",
      });
    }

    res.status(200).json(guest);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update guest",
      error: error.message,
    });
  }
};

const deleteGuest = async (req, res) => {
  try {
    const guest = await Guest.findByIdAndDelete(req.params.guestId);

    if (!guest) {
      return res.status(404).json({
        message: "Guest not found",
      });
    }

    res.status(200).json({
      message: "Guest deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete guest",
      error: error.message,
    });
  }
};

module.exports = {
  getGuests,
  createGuest,
  updateGuest,
  deleteGuest,
};
