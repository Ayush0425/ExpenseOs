const express = require("express");
const cors = require("cors");
const expenseRoutes = require("./routes/expenseRoutes");

const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/expenses", expenseRoutes);

app.get("/", (req, res) => {
  res.send("🚀 ExpenseOS Backend Running");
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Backend Connected Successfully 🚀",
  });
});

module.exports = app;