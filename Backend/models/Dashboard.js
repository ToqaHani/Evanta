const mongoose = require("mongoose");

const dashboardSchema = new mongoose.Schema(
  {
    eventId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    event: {
      id: {
        type: String,
        required: true,
      },

      name: {
        type: String,
        required: true,
        trim: true,
      },

      type: {
        type: String,
        required: true,
        trim: true,
      },

      date: {
        type: String,
        required: true,
      },

      displayDate: {
        type: String,
        required: true,
      },

      location: {
        type: String,
        required: true,
        trim: true,
      },
    },

    countdown: {
      days: {
        type: Number,
        default: 0,
      },

      hours: {
        type: Number,
        default: 0,
      },

      minutes: {
        type: Number,
        default: 0,
      },
    },

    stats: {
      guests: {
        current: {
          type: Number,
          default: 0,
        },

        total: {
          type: Number,
          default: 0,
        },

        label: {
          type: String,
          default: "Confirmed",
        },
      },

      budget: {
        spent: {
          type: Number,
          default: 0,
        },

        total: {
          type: Number,
          default: 0,
        },

        currency: {
          type: String,
          default: "EGP",
        },
      },

      tasks: {
        done: {
          type: Number,
          default: 0,
        },

        total: {
          type: Number,
          default: 0,
        },
      },

      vendors: {
        booked: {
          type: Number,
          default: 0,
        },

        total: {
          type: Number,
          default: 0,
        },
      },
    },

    guestOverview: {
      confirmed: {
        type: Number,
        default: 0,
      },

      maybe: {
        type: Number,
        default: 0,
      },

      notComing: {
        type: Number,
        default: 0,
      },

      noResponse: {
        type: Number,
        default: 0,
      },
    },

    budgetOverview: {
      total: {
        type: Number,
        default: 0,
      },

      spent: {
        type: Number,
        default: 0,
      },

      remaining: {
        type: Number,
        default: 0,
      },
    },

    taskProgress: {
      completed: {
        type: Number,
        default: 0,
      },

      total: {
        type: Number,
        default: 0,
      },
    },

    upcoming: [
      {
        title: {
          type: String,
          required: true,
        },

        due: {
          type: String,
          default: "",
        },

        tone: {
          type: String,
          default: "orange",
        },
      },
    ],

    vendors: [
      {
        name: {
          type: String,
          required: true,
        },

        booked: {
          type: Boolean,
          default: false,
        },
      },
    ],

    activity: [
      {
        text: {
          type: String,
          required: true,
        },

        time: {
          type: String,
          default: "",
        },

        icon: {
          type: String,
          default: "check",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Dashboard = mongoose.model("Dashboard", dashboardSchema);

module.exports = Dashboard;