const mongoose = require("mongoose");

const guestSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["Confirmed", "Maybe", "Not Coming", "No Response"],
      default: "No Response",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Guest", guestSchema);
