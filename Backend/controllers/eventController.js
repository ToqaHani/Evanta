const Event = require("../models/eventModel");

const createEvent = async (req, res) => {
    try {
        const {
            name,
            type,
            date,
            time,
            location,
            expectedGuests,
            budget
        } = req.body;

        const event = await Event.create({
            userId: req.user.userId,
            name,
            type,
            date,
            time,
            location,
            expectedGuests,
            budget
        });

        res.status(201).json({
            message: "Event created successfully",
            event
        });

    } catch (error) {
        res.status(400).json({
            message: "Failed to create event",
            error: error.message
        });
    }
};

module.exports = {
    createEvent
};