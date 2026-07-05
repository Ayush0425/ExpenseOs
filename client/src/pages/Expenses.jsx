import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function Expenses() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const expenseId = searchParams.get("id");

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch expense when editing
  useEffect(() => {
    if (expenseId) {
      fetchExpense();
    }
  }, [expenseId]);

  const fetchExpense = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `http://localhost:5000/api/expenses/${expenseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const expense = response.data.expense;

      setTitle(expense.title);
      setAmount(expense.amount);
      setCategory(expense.category);
      setDate(expense.date.split("T")[0]);
    } catch (error) {
      toast.error("Failed to load expense");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      if (expenseId) {
        // Update Expense
        await axios.put(
          `http://localhost:5000/api/expenses/${expenseId}`,
          {
            title,
            amount: Number(amount),
            category,
            date,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success("Expense Updated Successfully 🎉");
      } else {
        // Add Expense
        await axios.post(
          "http://localhost:5000/api/expenses/add",
          {
            title,
            amount: Number(amount),
            category,
            date,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success("Expense Added Successfully 🎉");
      }

      navigate("/expense-list");
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message ||
          (expenseId ? "Failed to update expense" : "Failed to add expense")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[450px]">
        <h1 className="text-3xl font-bold text-center mb-6">
          {expenseId ? "Edit Expense" : "Add Expense"}
        </h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Expense Title"
            className="w-full border p-3 rounded mb-4"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="number"
            placeholder="Amount"
            className="w-full border p-3 rounded mb-4"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <select
            className="w-full border p-3 rounded mb-4"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Shopping">Shopping</option>
            <option value="Bills">Bills</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Others">Others</option>
          </select>

          <input
            type="date"
            className="w-full border p-3 rounded mb-6"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 text-white p-3 rounded hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading
              ? expenseId
                ? "Updating..."
                : "Adding..."
              : expenseId
              ? "Update Expense"
              : "Add Expense"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Expenses;