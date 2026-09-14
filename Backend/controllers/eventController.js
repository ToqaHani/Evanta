const Event = require("../models/eventModel");
const Task = require("../models/Task");

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

const saveSmartPlan = async (req, res) => {
    try {
        const {
            date,
            expectedGuests,
            location,
            budget,
            smartPlan
        } = req.body;

        const event = await Event.findOneAndUpdate(
            {
                _id: req.params.eventId,
                userId: req.user.userId
            },
            {
                date,
                expectedGuests,
                location,
                budget,
                smartPlan
            },
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

        // Delete old tasks for this event
        await Task.deleteMany({
            eventId: event._id
        });

        // Generate new tasks based on Smart Plan
        const tasks = [];

        if (smartPlan.venue) {
            tasks.push({
                eventId: event._id,
                title: "Book the venue",
                description: `Book the ${smartPlan.venue.name}`,
                dueDate: event.date,
                priority: "High"
            });
        }

        if (smartPlan.decoration) {
            tasks.push({
                eventId: event._id,
                title: "Arrange the decoration",
                description: `Arrange ${smartPlan.decoration.name} decoration`,
                dueDate: event.date,
                priority: "Medium"
            });
        }

        if (smartPlan.catering?.length) {
            smartPlan.catering.forEach((item) => {
                tasks.push({
                    eventId: event._id,
                    title: `Prepare ${item.name}`,
                    description: `Arrange ${item.name} for the event`,
                    dueDate: event.date,
                    priority: "Medium"
                });
            });
        }

        if (smartPlan.photography?.length) {
            smartPlan.photography.forEach((item) => {
                tasks.push({
                    eventId: event._id,
                    title: `Book ${item.name}`,
                    description: `Arrange ${item.name} for the event`,
                    dueDate: event.date,
                    priority: "High"
                });
            });
        }

        if (smartPlan.entertainment?.length) {
            smartPlan.entertainment.forEach((item) => {
                tasks.push({
                    eventId: event._id,
                    title: `Book ${item.name}`,
                    description: `Arrange ${item.name} for the event`,
                    dueDate: event.date,
                    priority: "Medium"
                });
            });
        }

        if (smartPlan.invitations?.length) {
            smartPlan.invitations.forEach((item) => {
                tasks.push({
                    eventId: event._id,
                    title: `Prepare ${item.name}`,
                    description: `Prepare ${item.name} for the event`,
                    dueDate: event.date,
                    priority: "Medium"
                });
            });
        }

        if (smartPlan.cake?.length) {
            smartPlan.cake.forEach((item) => {
                tasks.push({
                    eventId: event._id,
                    title: `Order ${item.name}`,
                    description: `Arrange ${item.name} for the event`,
                    dueDate: event.date,
                    priority: "Medium"
                });
            });
        }

        if (smartPlan.flowers?.length) {
            smartPlan.flowers.forEach((item) => {
                tasks.push({
                    eventId: event._id,
                    title: `Arrange ${item.name}`,
                    description: `Arrange ${item.name} for the event`,
                    dueDate: event.date,
                    priority: "Low"
                });
            });
        }

        if (tasks.length > 0) {
            await Task.insertMany(tasks);
        }

        res.status(200).json({
            message: "Smart plan saved successfully",
            event
        });

    } catch (error) {
        res.status(400).json({
            message: "Failed to save smart plan",
            error: error.message
        });
    }
};

module.exports = {
    createEvent,
    getEvents,
    updateEvent,
    deleteEvent,
    saveSmartPlan
};