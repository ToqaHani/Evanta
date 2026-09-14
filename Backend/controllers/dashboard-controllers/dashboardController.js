const Event = require("../models/eventModel");
const Guest = require("../models/Guest");
const Task = require("../models/Task");
const Expense = require("../models/expenseModel");

// Helper: format event date
const formatEventDate = (date) => {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

// Helper: calculate due text
const getDueText = (date) => {
  if (!date) return "";

  const today = new Date();
  const dueDate = new Date(date);

  today.setHours(0, 0, 0, 0);
  dueDate.setHours(0, 0, 0, 0);

  const difference = dueDate - today;

  const days = Math.ceil(
    difference / (1000 * 60 * 60 * 24)
  );

  if (days < 0) {
    return `${Math.abs(days)} day${Math.abs(days) === 1 ? "" : "s"} overdue`;
  }

  if (days === 0) {
    return "Due today";
  }

  if (days === 1) {
    return "Due tomorrow";
  }

  return `Due in ${days} days`;
};

// GET DASHBOARD
const getDashboard = async (req, res) => {
  try {
    const { eventId } = req.params;

    // -------------------------
    // 1. GET EVENT
    // -------------------------

    const event = await Event.findById(eventId).lean();

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    // -------------------------
    // 2. GET RELATED DATA
    // -------------------------

    const [guests, tasks, expenses] = await Promise.all([
      Guest.find({ eventId }).lean(),

      Task.find({ eventId })
        .sort({ dueDate: 1 })
        .lean(),

      Expense.find({ eventId })
        .sort({ date: -1 })
        .lean(),
    ]);

    // -------------------------
    // 3. GUEST STATISTICS
    // -------------------------

    const confirmedGuests = guests.filter(
      (guest) => guest.status === "Confirmed"
    ).length;

    const maybeGuests = guests.filter(
      (guest) => guest.status === "Maybe"
    ).length;

    const notComingGuests = guests.filter(
      (guest) => guest.status === "Not Coming"
    ).length;

    const noResponseGuests = guests.filter(
      (guest) => guest.status === "No Response"
    ).length;

    // Event expectedGuests is used as the target
    const totalExpectedGuests = event.expectedGuests || 0;

    // -------------------------
    // 4. TASK STATISTICS
    // -------------------------

    const completedTasks = tasks.filter(
      (task) => task.status === "Completed"
    ).length;

    const totalTasks = tasks.length;

    // -------------------------
    // 5. BUDGET STATISTICS
    // -------------------------

    const totalBudget = Number(event.budget) || 0;

    const spentBudget = expenses.reduce(
      (total, expense) =>
        total + (Number(expense.amount) || 0),
      0
    );

    const remainingBudget = Math.max(
      totalBudget - spentBudget,
      0
    );

    // -------------------------
    // 6. UPCOMING TASKS
    // -------------------------

    const upcomingTasks = tasks
      .filter((task) => task.status !== "Completed")
      .slice(0, 5)
      .map((task) => ({
        id: task._id,
        title: task.title,
        due: getDueText(task.dueDate),
        tone:
          task.priority === "High"
            ? "orange"
            : task.priority === "Medium"
            ? "caramel"
            : "neutral",
      }));

    // -------------------------
    // 7. RECENT ACTIVITY
    // -------------------------

    const activity = [];

    guests
      .slice(-3)
      .reverse()
      .forEach((guest) => {
        activity.push({
          id: `guest-${guest._id}`,
          text: `${guest.name} added to guest list`,
          time: "Guest update",
          icon: "users",
        });
      });

    tasks
      .filter((task) => task.status === "Completed")
      .slice(-3)
      .reverse()
      .forEach((task) => {
        activity.push({
          id: `task-${task._id}`,
          text: `${task.title} completed`,
          time: "Task completed",
          icon: "task",
        });
      });

    expenses
      .slice(0, 3)
      .forEach((expense) => {
        activity.push({
          id: `expense-${expense._id}`,
          text: `${expense.name} expense added`,
          time: `${Number(
            expense.amount
          ).toLocaleString()} EGP`,
          icon: "plus",
        });
      });

    // -------------------------
    // 8. BUILD DASHBOARD
    // -------------------------

    const response = {
      event: {
        id: event._id,
        name: event.name,
        type: event.type,
        date: new Date(event.date)
          .toISOString()
          .split("T")[0],
        displayDate: formatEventDate(event.date),
        location: event.location,
        time: event.time,
      },

      stats: {
        guests: {
          current: confirmedGuests,
          total: totalExpectedGuests,
          label: "Confirmed",
        },

        budget: {
          spent: spentBudget,
          total: totalBudget,
          currency: "EGP",
        },

        tasks: {
          done: completedTasks,
          total: totalTasks,
        },

        // Vendors will be connected to Event later
        vendors: {
          booked: 0,
          total: 0,
        },
      },

      guestOverview: {
        confirmed: confirmedGuests,
        maybe: maybeGuests,
        notComing: notComingGuests,
        noResponse: noResponseGuests,
      },

      budgetOverview: {
        total: totalBudget,
        spent: spentBudget,
        remaining: remainingBudget,
      },

      taskProgress: {
        completed: completedTasks,
        total: totalTasks,
      },

      upcoming: upcomingTasks,

      // Vendors will be fixed in a later step
      vendors: [],

      activity: activity.slice(0, 6),
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error(
      "Get dashboard error:",
      error
    );

    return res.status(500).json({
      message: "Failed to retrieve dashboard",
      error: error.message,
    });
  }
};

module.exports = {
  getDashboard,
};