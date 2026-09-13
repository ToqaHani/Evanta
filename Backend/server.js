const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const taskRoutes = require("./routes/taskRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const invitationsRoutes = require("./routes/invitationsRoutes");

// Vendor routes
const vendorRoutes = require("./routes/routes-vendors/vendorRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Existing routes
app.use("/api", taskRoutes);
app.use("/api/budget", expenseRoutes);
app.use("/api/invitations", invitationsRoutes);

// Vendor routes
app.use("/api/vendors", vendorRoutes);

// Connect to MongoDB
connectDB();

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});