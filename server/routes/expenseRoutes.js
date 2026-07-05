const express = require("express");
const router = express.Router();

const {
  addExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
  getDashboard,
} = require("../controllers/expenseController");

const protect = require("../middlewares/authMiddleware");

router.post("/add", protect, addExpense);
router.get("/", protect, getExpenses);
router.get("/dashboard", protect, getDashboard);
router.get("/:id", protect, getExpenseById);
router.put("/:id", protect, updateExpense);
router.delete("/:id", protect, deleteExpense);

module.exports = router;