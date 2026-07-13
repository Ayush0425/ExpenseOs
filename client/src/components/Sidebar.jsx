import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdDashboard, MdLogout } from "react-icons/md";
import { FaMoneyBillWave } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import toast from "react-hot-toast";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  navigate("/", { replace: true });
};

  const linkClass = (path) =>
    `flex items-center gap-3 p-3 rounded-lg transition ${
      location.pathname === path
        ? "bg-green-600 text-white"
        : "hover:bg-slate-700"
    }`;

  return (
    <div className="w-64 min-h-screen bg-slate-900 text-white p-6 flex flex-col">

      <div>
        <h1 className="text-3xl font-bold mb-10">
          ExpenseOS
        </h1>

        <nav className="space-y-3">

          <Link to="/dashboard" className={linkClass("/dashboard")}>
            <MdDashboard size={22} />
            Dashboard
          </Link>

          <Link to="/expense-list" className={linkClass("/expense-list")}>
            <FaMoneyBillWave size={20} />
            Expenses
          </Link>

          <Link to="/expenses" className={linkClass("/expenses")}>
            <IoMdAddCircle size={22} />
            Add Expense
          </Link>

        </nav>
      </div>

      <button
        onClick={logout}
        className="mt-auto flex items-center gap-3 bg-red-600 hover:bg-red-700 p-3 rounded-lg"
      >
        <MdLogout size={22} />
        Logout
      </button>

    </div>
  );
}

export default Sidebar;