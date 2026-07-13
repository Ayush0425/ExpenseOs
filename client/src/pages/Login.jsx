import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await api.post("/users/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
localStorage.setItem("user", JSON.stringify(response.data.user));;

      alert("Login Successful 🎉");

      navigate("/dashboard", { replace: true });
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="bg-white rounded-xl p-8 w-96 shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">
          ExpenseOS
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-green-500 text-white p-3 rounded hover:bg-green-600"
        >
          Login
        </button>

        <p className="text-center mt-5 text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-green-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;