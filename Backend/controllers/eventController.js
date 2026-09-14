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

const getEvents = async (req, res) => {
    try {
        const events = await Event.find({
            userId: req.user.userId
        });

        res.status(200).json(events);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch events",
            error: error.message
        });
    }
};

const updateEvent = async (req, res) => {
    try {
        const event = await Event.findOneAndUpdate(
            {
                _id: req.params.eventId,
                userId: req.user.userId
            },
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        res.status(200).json({
            message: "Event updated successfully",
            event
        });

    } catch (error) {
        res.status(400).json({
            message: "Failed to update event",
            error: error.message
        });
    }
};

const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findOneAndDelete({
            _id: req.params.eventId,
            userId: req.user.userId
        });

        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        res.status(200).json({
            message: "Event deleted successfully",
            event
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete event",
            error: error.message
        });
    }
};

module.exports = {
    createEvent,
    getEvents,
    updateEvent,
    deleteEvent
};