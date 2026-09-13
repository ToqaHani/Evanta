const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const taskRoutes = require("./routes/taskRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const invitationsRoutes = require("./routes/invitationsRoutes");

// Dashboard routes
const dashboardRoutes = require("./routes/dashboard-routes/dashboardRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Existing routes
app.use("/api", taskRoutes);
app.use("/api/budget", expenseRoutes);
app.use("/api/invitations", invitationsRoutes);

// Dashboard routes
app.use("/api/events", dashboardRoutes);

// Connect to MongoDB
connectDB();

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});