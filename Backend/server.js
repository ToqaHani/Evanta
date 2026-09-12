const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/db");

const guestRoutes = require("./routes/guestRoutes");
const taskRoutes = require("./routes/taskRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const invitationsRoutes = require("./routes/invitationsRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", guestRoutes);
app.use("/api", taskRoutes);
app.use("/api/budget", expenseRoutes);
app.use("/api/invitations", invitationsRoutes);

connectDB();

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});