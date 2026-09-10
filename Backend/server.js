const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/db");

const guestRoutes = require("./routes/guestRoutes");

const app = express();

app.use(express.json());

app.use("/api", guestRoutes);

connectDB();

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
