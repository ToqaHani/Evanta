const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/userRoutes");
const eventRoutes = require("./routes/eventRoutes");
const guestRoutes = require("./routes/guestRoutes");
const taskRoutes = require("./routes/taskRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const invitationsRoutes = require("./routes/invitationsRoutes");
const dashboardRoutes = require("./routes/dashboard-routes/dashboardRoutes");
const vendorRoutes = require("./routes/routes-vendors/vendorRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/events", dashboardRoutes);
app.use("/api/guest", guestRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/budget", expenseRoutes);
app.use("/api/invitations", invitationsRoutes);
app.use("/api/vendors", vendorRoutes);

connectDB();

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});