import { useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function ExpenseList() {
  const navigate = useNavigate();

  const [expenses, setExpenses] = useState([]);
  const [search, setSearch] = useState("");

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

  const filteredExpenses = expenses.filter((expense) =>
    expense.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-100 p-10">
     <div className="flex justify-between items-center mb-8">
  <h1 className="text-4xl font-bold">
    All Expenses
  </h1>

  <button
    onClick={() => navigate("/dashboard")}
    className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
  >
    ← Dashboard
  </button>
</div>

      <input
        type="text"
        placeholder="🔍 Search expenses..."
        className="w-full mb-6 p-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="bg-white rounded-xl shadow">
        {filteredExpenses.length === 0 ? (
          <p className="p-6 text-center text-gray-500">
            No expenses found.
          </p>
        ) : (
          filteredExpenses.map((expense) => (
            <div
              key={expense._id}
              className="flex justify-between items-center border-b p-5 hover:bg-slate-50 transition"
            >
              <div>
                <h2 className="font-semibold text-lg">
                  {expense.title}
                </h2>

                <p className="text-gray-500">
                  {expense.category}
                </p>
              </div>

              <div className="flex items-center gap-6">
                <span className="font-bold text-green-600 text-lg">
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