import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Sidebar from "../components/Sidebar";
import ExpenseChart from "../components/ExpenseChart";

function Dashboard() {
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/expenses/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDashboard(response.data.dashboard);
    } catch (error) {
      console.log(error);
      alert("Failed to load dashboard");
    }
  };

  if (!dashboard) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <h1 className="text-3xl font-bold">Loading Dashboard...</h1>
      </div>
    );
  }
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-slate-100 min-h-screen p-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold text-slate-800">
             Welcome back, {user?.name} 👋
            </h1>

            <p className="text-gray-500 mt-2">
              Manage your expenses efficiently and stay on top of your finances.
            </p>
          </div>

          <button
            onClick={() => navigate("/expenses")}
            className="bg-green-600 hover:bg-green-700 transition text-white px-6 py-3 rounded-xl shadow-md"
          >
            + Add Expense
          </button>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="bg-gradient-to-r from-green-500 to-green-700 text-white rounded-2xl shadow-lg p-6">
            <h2 className="text-lg">Total Expenses</h2>

            <p className="text-4xl font-bold mt-4">
              ₹ {dashboard.totalExpenses}
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-2xl shadow-lg p-6">
            <h2 className="text-lg">Total Transactions</h2>

            <p className="text-4xl font-bold mt-4">
              {dashboard.totalTransactions}
            </p>
          </div>
        </div>

        {/* Recent Expenses */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6">
            Recent Expenses
          </h2>

          {dashboard.recentExpenses.length === 0 ? (
            <p className="text-gray-500 text-center py-6">
              No expenses found.
            </p>
          ) : (
            dashboard.recentExpenses.map((expense) => (
              <div
                key={expense._id}
                className="flex justify-between items-center border-b py-4 hover:bg-slate-50 transition px-3 rounded-lg"
              >
                <div>
                  <p className="font-semibold text-lg">
                    {expense.title}
                  </p>

                  <p className="text-sm text-gray-500">
                    {expense.category}
                  </p>
                </div>

                <span className="text-xl font-bold text-green-600">
                  ₹ {expense.amount}
                </span>
              </div>
            ))
          )}
        </div>

        {/* Expense Chart */}
        <div className="mt-10">
          <ExpenseChart data={dashboard.categorySummary} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;