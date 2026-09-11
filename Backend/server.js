const express = require("express");
const connectDB = require("./config/db");

const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(express.json());

app.use("/api", taskRoutes);

connectDB();

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});