const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    type: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        required: true
    },

    time: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    expectedGuests: {
        type: Number,
        required: true
    },

    budget: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Event", eventSchema);