import { useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function ExpenseList() {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/expenses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setExpenses(response.data.expenses);
    } catch (error) {
      toast.error("Failed to fetch expenses");
    }
  };

  const deleteExpense = async (id) => {
    if (!window.confirm("Delete this expense?")) return;

    try {
      const token = localStorage.getItem("token");

      await api.delete(`/expenses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Expense Deleted");
      fetchExpenses();
    } catch (error) {
      toast.error("Delete Failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-10">
      <h1 className="text-4xl font-bold mb-8">
        All Expenses
      </h1>

      <div className="bg-white rounded-xl shadow">
        {expenses.length === 0 ? (
          <p className="p-6 text-center">
            No expenses found.
          </p>
        ) : (
          expenses.map((expense) => (
            <div
              key={expense._id}
              className="flex justify-between items-center border-b p-5"
            >
              <div>
                <h2 className="font-semibold">
                  {expense.title}
                </h2>

                <p className="text-gray-500">
                  {expense.category}
                </p>
              </div>

              <div className="flex items-center gap-6">
                <span className="font-bold text-green-600">
                  ₹ {expense.amount}
                </span>

                <button
                  onClick={() => navigate(`/expenses?id=${expense._id}`)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteExpense(expense._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ExpenseList;