const mongoose = require("mongoose");
const vendorSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },

    type: {
      type: String,
      required: [true, "Vendor type is required"],
      trim: true,
    },

    name: {
      type: String,
      required: [true, "Vendor name is required"],
      trim: true,
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },

    date: {
      type: String,
      required: [true, "Date is required"],
      trim: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Booked"],
      default: "Pending",
    },

    notes: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);
