const Dashboard = require("../models/Dashboard");

// GET DASHBOARD
// GET /api/events/:eventId/dashboard
const getDashboard = async (req, res) => {
  try {
    const { eventId } = req.params;

    const dashboard = await Dashboard.findOne({ eventId }).lean();

    if (!dashboard) {
      return res.status(404).json({
        message: "Dashboard not found for this event",
      });
    }

    const response = {
      event: dashboard.event,

      countdown: dashboard.countdown,

      stats: dashboard.stats,

      guestOverview: dashboard.guestOverview,

      budgetOverview: dashboard.budgetOverview,

      taskProgress: dashboard.taskProgress,

      upcoming: dashboard.upcoming.map((item) => ({
        id: item._id,
        title: item.title,
        due: item.due,
        tone: item.tone,
      })),

      vendors: dashboard.vendors.map((vendor) => ({
        id: vendor._id,
        name: vendor.name,
        booked: vendor.booked,
      })),

      activity: dashboard.activity.map((item) => ({
        id: item._id,
        text: item.text,
        time: item.time,
        icon: item.icon,
      })),
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Get dashboard error:", error);

    res.status(500).json({
      message: "Failed to retrieve dashboard",
      error: error.message,
    });
  }
};

// CREATE DASHBOARD
// POST /api/events/:eventId/dashboard
const createDashboard = async (req, res) => {
  try {
    const { eventId } = req.params;

    const existingDashboard = await Dashboard.findOne({
      eventId,
    });

    if (existingDashboard) {
      return res.status(409).json({
        message: "Dashboard already exists for this event",
      });
    }

    const dashboard = await Dashboard.create({
      ...req.body,
      eventId,

      event: {
        ...req.body.event,
        id: eventId,
      },
    });

    res.status(201).json({
      message: "Dashboard created successfully",
      dashboard,
    });
  } catch (error) {
    console.error("Create dashboard error:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Dashboard validation failed",
        error: error.message,
      });
    }

    res.status(500).json({
      message: "Failed to create dashboard",
      error: error.message,
    });
  }
};

// UPDATE DASHBOARD
// PUT /api/events/:eventId/dashboard
const updateDashboard = async (req, res) => {
  try {
    const { eventId } = req.params;

    const updateData = {
      ...req.body,
    };

    // Prevent eventId from being changed from request body
    delete updateData.eventId;

    if (updateData.event) {
      updateData.event = {
        ...updateData.event,
        id: eventId,
      };
    }

    const dashboard = await Dashboard.findOneAndUpdate(
      { eventId },
      {
        $set: updateData,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!dashboard) {
      return res.status(404).json({
        message: "Dashboard not found for this event",
      });
    }

    res.status(200).json({
      message: "Dashboard updated successfully",
      dashboard,
    });
  } catch (error) {
    console.error("Update dashboard error:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Dashboard validation failed",
        error: error.message,
      });
    }

    res.status(500).json({
      message: "Failed to update dashboard",
      error: error.message,
    });
  }
};

// DELETE DASHBOARD
// DELETE /api/events/:eventId/dashboard
const deleteDashboard = async (req, res) => {
  try {
    const { eventId } = req.params;

    const dashboard = await Dashboard.findOneAndDelete({
      eventId,
    });

    if (!dashboard) {
      return res.status(404).json({
        message: "Dashboard not found for this event",
      });
    }

    res.status(200).json({
      message: "Dashboard deleted successfully",
    });
  } catch (error) {
    console.error("Delete dashboard error:", error);

    res.status(500).json({
      message: "Failed to delete dashboard",
      error: error.message,
    });
  }
};

module.exports = {
  getDashboard,
  createDashboard,
  updateDashboard,
  deleteDashboard,
};