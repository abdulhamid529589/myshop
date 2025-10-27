import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  // ✅ Save user session
  const saveSession = (user) => {
    localStorage.setItem("session", JSON.stringify(user));
  };

  // ✅ Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const exist = users.find(
      (user) => user.email === email && user.password === password
    );

    if (exist) {
      saveSession(exist);
      toast.success("✅ Login Successful", { position: "top-center" });
      setTimeout(() => navigate("/"), 1500);
    } else {
      toast.error("❌ Invalid credentials. Please sign up first.", {
        position: "top-center",
      });
    }
  };

  // ✅ Handle Signup
  const handleSignup = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("❌ Passwords do not match", { position: "top-center" });
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find((user) => user.email === email)) {
      toast.warn("⚠️ User already exists. Please login.", {
        position: "top-center",
      });
      setIsLogin(true);
      return;
    }

    const newUser = { email, password };
    localStorage.setItem("users", JSON.stringify([...users, newUser]));
    toast.success("✅ Account created successfully! Please login.", {
      position: "top-center",
    });
    setIsLogin(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 via-indigo-500 to-pink-500 px-4">
      <div className="relative bg-white/20 backdrop-blur-lg rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-md transition-all duration-500 hover:scale-[1.01]">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-center text-white mb-6 drop-shadow-lg">
          {isLogin ? "Welcome Back 👋" : "Join Us 🚀"}
        </h1>

        {/* ✅ Login Form */}
        {isLogin ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-white/30 bg-white/30 text-white placeholder-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-white/30 bg-white/30 text-white placeholder-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
              required
            />
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold text-sm sm:text-base hover:bg-purple-700 transition"
            >
              Login
            </button>
          </form>
        ) : (
          /* ✅ Signup Form */
          <form onSubmit={handleSignup} className="space-y-4">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-white/30 bg-white/30 text-white placeholder-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-white/30 bg-white/30 text-white placeholder-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-white/30 bg-white/30 text-white placeholder-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
              required
            />
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold text-sm sm:text-base hover:bg-purple-700 transition"
            >
              Sign Up
            </button>
          </form>
        )}

        {/* ✅ Toggle between Login/Signup */}
        <p className="text-center text-gray-200 mt-6 text-sm sm:text-base">
          {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-yellow-300 font-semibold hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>

        {/* Decorative gradient circle */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/20 rounded-full blur-2xl"></div>
      </div>

      {/* ✅ Toast container */}
      <ToastContainer autoClose={2500} hideProgressBar theme="colored" />
    </div>
  );
};

export default Login;
