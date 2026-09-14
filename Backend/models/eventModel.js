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
    },

    smartPlan: {
        venue: {
            name: String,
            price: Number
        },

        decoration: {
            name: String,
            price: Number
        },

        catering: [{
            name: String,
            price: Number
        }],

        photography: [{
            name: String,
            price: Number
        }],

        entertainment: [{
            name: String,
            price: Number
        }],

        invitations: [{
            name: String,
            price: Number
        }],

        cake: [{
            name: String,
            price: Number
        }],

        flowers: [{
            name: String,
            price: Number
        }],

        estimatedCost: {
            type: Number
        }
    }
});

module.exports = mongoose.model("Event", eventSchema);