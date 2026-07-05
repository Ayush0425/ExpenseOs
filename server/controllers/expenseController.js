const mongoose = require("mongoose");
const Expense = require("../models/Expense");

// =========================
// Add Expense
// =========================
const addExpense = async (req, res) => {
  try {
    const { title, amount, category, date } = req.body;

    if (!title || !amount || !category) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const expense = await Expense.create({
      title,
      amount,
      category,
      date,
      user: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Expense Added Successfully",
      expense,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// Get All Expenses
// =========================
const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({
      user: req.user.id,
    }).sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: expenses.length,
      expenses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// Get Single Expense
// =========================
const getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    res.status(200).json({
      success: true,
      expense,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// Update Expense
// =========================
const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Expense Updated Successfully",
      expense: updatedExpense,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// Delete Expense
// =========================
const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    await Expense.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Expense Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// Dashboard Summary
// =========================
const getDashboard = async (req, res) => {
  try {
    const expenses = await Expense.find({
      user: req.user.id,
    }).sort({ date: -1 });

    const totalExpenses = expenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );

    const totalTransactions = expenses.length;

    const recentExpenses = expenses.slice(0, 5);

    const categorySummary = await Expense.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(req.user.id),
        },
      },
      {
        $group: {
          _id: "$category",
          total: {
            $sum: "$amount",
          },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      dashboard: {
        totalExpenses,
        totalTransactions,
        recentExpenses,
        categorySummary,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
  getDashboard,
};